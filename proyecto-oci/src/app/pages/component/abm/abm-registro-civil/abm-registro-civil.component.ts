import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioCivil } from 'src/app/modelos/componentes/UsuarioCiv';
import { UsuarioCivilService } from 'src/app/servicios/index.service';

@Component({
  selector: 'app-abm-registro-civil',
  templateUrl: './abm-registro-civil.component.html',
  styleUrls: ['./abm-registro-civil.component.scss']
})
export class AbmRegistroCivilComponent implements OnInit {
  id!: number;
  //valida el formulario
  form!: FormGroup;

  //variable para verificar si fue enviado los datos
  enviado = false;

  item!: UsuarioCivil;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: UsuarioCivilService,
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
      sexo: ['', Validators.required],
      grupoS: ['', Validators.required],
      factor: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      domicilio: ['', Validators.required],
      fechaFinContrato: ['', Validators.required],
    });

    //captura el id que viene en el url
    this.id = this.route.snapshot.params['id'];

    //FindId
    this.findId();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  findId() {
    
  }

  doAction() {
    this.enviado = true;
    if (this.form.valid) {
      if (this.id > 0) {
        alert("Aqui estoy")
        this.actualizarDatos(this.item);
      } else {
        alert("Aqui estoy")
        this.guardar();
      }
    }
  }

  public guardar() {
    let usuarioCivil: UsuarioCivil = {
      apellido: this.form.controls['apellido'].value,
      nombre: this.form.controls['nombre'].value,
      norDni: this.form.controls['dni'].value,
      sexo: this.form.controls['sexo'].value,
      grupoS: this.form.controls['grupoS'].value,
      factor: this.form.controls['factor'].value,
      fechaNacimiento: this.form.controls['fechaNac'].value,
      domicilio: this.form.controls['domicilio'].value,
      fechaFinContrato: this.form.controls['contrato'].value,
    };

    
    this.back();
  }

  actualizarDatos(usuario: UsuarioCivil) {
    
  }

  back() {
    this.router.navigate(['/lst-usuario']);
  }

}
