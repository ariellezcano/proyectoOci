import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { UsuarioCivil } from 'src/app/modelos/componentes/UsuarioCiv';
import { UsuarioCivilService } from 'src/app/servicios/index.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';

@Component({
  selector: 'app-abm-registro-civil',
  templateUrl: './abm-registro-civil.component.html',
  styleUrls: ['./abm-registro-civil.component.scss']
})
export class AbmRegistroCivilComponent implements OnInit {
  @Output()
  finalizado: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  @Output()
  cancelado: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  id!: number;
  //valida el formulario
  form!: FormGroup;

  //variable para verificar si fue enviado los datos
  enviado = false;
  procesando!: Boolean;


  item!: UsuarioCivil;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsdl: UsuarioCivilService,
    private formBuilder: FormBuilder
  ) {
    this.item = new UsuarioCivil();
  }

  ngOnInit(): void {
    //controla los campos del formulario
    this.form = this.formBuilder.group({
      apellido: ['', Validators.required],
      nombre: ['', Validators.required],
      norDni: ['', Validators.required],
      //sexo: ['', Validators.required],
      grupoS: ['', Validators.required],
      factor: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      fechaFinContrato: ['', Validators.required],
      domicilio: ['', Validators.required],
      //fechaFinContrato: ['', Validators.required],
    });

    //captura el id que viene en el url
    this.id = this.route.snapshot.params['id'];

    //FindId
    this.findID();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  async findID() {
    try {
      if (this.id > 0) {
        console.log(this.id);
        let data = await this.wsdl.doFind(this.id).then();
        let res = JSON.parse(JSON.stringify(data));
        if (res.code == 200) {
          this.item = res.data;

          console.log(this.item);
          // this.item.fechaAlta = moment(this.item.fechaAlta).format(
          //   'YYYY-MM-DD'
          // );
        }
      } else {
        this.item = new UsuarioCivil();
      }
    } catch (error) {
      UturuncoUtils.showToas('Error inesperado', 'error');
    }
  }

  doAction() {
    this.enviado = true;
    if (this.form.valid) {
      if (this.id > 0) {
        
        this.doEdit(this.item);
      } else {
        this.doCreate();
      }
    }
  }

  async doCreate() {
    try {
      this.item.sexo.id = 1;
      this.item.unidad.id = 1;
      this.procesando = true;
      const res = await this.wsdl.doInsert(this.item).then();
      console.log("res", res);
      const result = JSON.parse(JSON.stringify(res));

      if (result.code == 200) {
        // this.item = result.status;
        UturuncoUtils.showToas('Se creo correctamente', 'success');
        this.back();
        this.finalizado.emit(true);
      } else if (result.status == 666) {
        // logout app o refresh token
      } else {
        UturuncoUtils.showToas(result.msg, 'error');
      }
    } catch (error: any) {
      UturuncoUtils.showToas('Excepción: ' + error.message, 'error');
    } finally {
      this.procesando = false;
    }
  }

  async doEdit(usuario: UsuarioCivil) {
    try {
      this.procesando = true;
      const res = await this.wsdl.doUpdate(this.item, this.item.id).then();
      const result = JSON.parse(JSON.stringify(res));
      console.log('resul', result);
      if (result.code == 200) {
        UturuncoUtils.showToas('Se actualizó correctamente', 'success');
        this.back();
        this.finalizado.emit(true);
      } else if (result.code == 666) {
        // logout app o refresh token
      } else {
        UturuncoUtils.showToas(result.msg, 'error');
      }
    } catch (error: any) {
      UturuncoUtils.showToas('Excepción: ' + error.message, 'error');
    }
    this.procesando = false;
  }

  back() {
    this.router.navigate(['/lst-usuarios']);
  }

}
