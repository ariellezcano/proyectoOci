import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tematica } from 'src/app/modelos/index.models';
import { TematicaService } from 'src/app/servicios/index.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';

@Component({
  selector: 'app-abm-tematica',
  templateUrl: './abm-tematica.component.html',
  styleUrls: ['./abm-tematica.component.scss'],
})
export class AbmTematicaComponent implements OnInit {
  @Output()
  finalizado: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  @Output()
  cancelado: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  item: Tematica;

  entity = 'lst-tematica';

  procesando!: Boolean;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsdl: TematicaService
  ) {
    this.item = new Tematica();
  }

  ngOnInit(): void {
    // try {
    //   this.item = JSON.parse(localStorage.getItem('b64')!);
    //   if (this.item != undefined) {
    //     this.ver(this.item);
    //   }
    // } catch (error) {
    // }
    this.id = this.route.snapshot.params.id;
    this.findID();
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
        this.item = new Tematica();
      }
    } catch (error) {
      UturuncoUtils.showToas('Error inesperado', 'error');
    }
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
      alert('Validar');
    }
    // console.log("base64 "+this.item.fileb64)
  }

  async doCreate() {
    try {
      this.procesando = true;
      const res = await this.wsdl.doInsert(this.item).then();
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

  async doEdit() {
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
    this.router.navigateByUrl(this.entity.toLowerCase());
  }
}
