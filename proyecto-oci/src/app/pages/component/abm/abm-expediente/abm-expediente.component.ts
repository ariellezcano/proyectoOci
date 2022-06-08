import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Expediente,
  Persona,
  Tematica,
  Unidad,
} from 'src/app/modelos/index.models';
import { ExpedienteService } from 'src/app/servicios/componentes/expediente.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';
import * as moment from 'moment';

@Component({
  selector: 'app-abm-expediente',
  templateUrl: './abm-expediente.component.html',
  styleUrls: ['./abm-expediente.component.scss'],
})
export class AbmExpedienteComponent implements OnInit {
  @Output()
  finalizado: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  @Output()
  cancelado: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  id!: number;
  item: Expediente;
  expediente!: Expediente;

  entity = 'lst-expediente';

  procesando!: Boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsdl: ExpedienteService
  ) {
    this.item = new Expediente();
  }

  ngOnInit(): void {
    // try {
    //   this.item = JSON.parse(localStorage.getItem('b64')!);
    //   if (this.item != undefined) {
    //     this.ver(this.item);
    //   }
    // } catch (error) {
    // }
    this.procesando = false;
    this.id = this.route.snapshot.params.id;
    this.findID();
  }

  doAction(f: NgForm) {
    /* validar */

    if (f.valid) {
      if (this.item.id > 0) {
        //editar
        this.doEdit();
      } else {
        this.doCreate();

        //localStorage.setItem('b64', JSON.stringify(this.item));
      }
    } else {
      //alert('Validar');
    }
    // console.log("base64 "+this.item.fileb64)
  }

  async findID() {
    try {
      if (this.id > 0) {
        //console.log(this.id);
        let data = await this.wsdl.doFind(this.id).then();
        let res = JSON.parse(JSON.stringify(data));
        if (res.code == 200) {
          this.item = res.data;

          //console.log(this.item);
          this.item.fecha = moment(this.item.fecha).format('YYYY-MM-DD');
        }
      } else {
        this.item = new Expediente();
      }
    } catch (error) {
      UturuncoUtils.showToas('Error inesperado', 'error');
    }
  }

  // async findID() {
  //   try {
  //     if (this.id > 0) {
  //       let data = await this.wsdl.doFind(this.id).then();
  //       let res = JSON.parse(JSON.stringify(data));
  //       if (res.status == 200) {
  //         this.item = res.data;

  //         console.log(this.item);
  //         this.item.expediente = moment(this.item.expediente).format(
  //           'YYYY-MM-DD'
  //         );
  //       }
  //     } else {
  //       this.item = new Equipo();
  //     }
  //   } catch (error) {
  //     UturuncoUtils.showToas('Error inesperado', 'error');
  //   }
  // }

  async doEdit() {
    try {
      this.procesando = true;
      const res = await this.wsdl.doUpdate(this.item, this.item.id).then();
      const result = JSON.parse(JSON.stringify(res));
     // console.log('resul', result);
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

  async doCreate() {
    try {
      this.procesando = true;
      this.item.persona.id = JSON.parse(
        '' + UturuncoUtils.getSession('user'));
      const res = await this.wsdl.doInsert(this.item).then();
      const result = JSON.parse(JSON.stringify(res));

      if (result.code == 200) {
        UturuncoUtils.showToas('Se creó correctamente', 'success');
        this.procesando = false;
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

  //combo tematica
  seleccionTematica(event: Tematica) {
    this.item.tematica = event;
  }

  unidad(event: Unidad) {
    this.item.unidad_origen = event;
  }

  back() {
    this.router.navigateByUrl(this.entity.toLowerCase());
  }
}
