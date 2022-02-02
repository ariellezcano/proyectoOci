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
  }

  doAction(f: NgForm) {
    /* validar */

    if (f.valid) {
      if (this.item.id > 0) {
        //editar
        //  this.doEdit();
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

      console.log('tematica', this.item);

      // const res = await this.wsdl.doInsert(this.item, this.expediente).then();
      // this.procesando = false;
      // const result = JSON.parse(JSON.stringify(res));

      // if (result.status == 200) {
      //   //this.item = result.status;
      //   UturuncoUtils.showToas('Se creó correctamente', 'success');
      //   this.back();
      //   this.finalizado.emit(true);
      // } else if (result.status == 666) {
      //   // logout app o refresh token
      // } else {
      //   UturuncoUtils.showToas(result.msg, 'error');
      // }
    } catch (error: any) {
      UturuncoUtils.showToas('Excepción: ' + error.message, 'error');
    } finally {
      this.procesando = false;
    }
  }

  back() {
    this.router.navigateByUrl(this.entity.toLowerCase());
  }
}
