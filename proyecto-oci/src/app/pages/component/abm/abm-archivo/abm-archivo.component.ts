import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import {
  Archivo,
  Expediente,
  Persona,
  Tematica,
  Unidad,
} from 'src/app/modelos/index.models';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ArchivoService } from 'src/app/servicios/index.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';
import { ExpedienteService } from 'src/app/servicios/componentes/expediente.service';
@Component({
  selector: 'app-abm-archivo',
  templateUrl: './abm-archivo.component.html',
  styleUrls: ['./abm-archivo.component.scss'],
})
export class AbmArchivoComponent implements OnInit {
  @Output()
  finalizado: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  @Output()
  cancelado: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  archivo!: Observable<any>;

  id!: number;
  item: Archivo;
  expediente!: Expediente;

  entity = 'lst-expediente';

  procesando!: Boolean;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    private wsdl: ArchivoService,
    private wsdlE: ExpedienteService
  ) {
    this.item = new Archivo();
    this.expediente = new Expediente();
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
      alert('Validar');
    }
    // console.log("base64 "+this.item.fileb64)
  }

  async findID() {
    try {
      if (this.id > 0) {
        console.log(this.id);
        let data = await this.wsdlE.doFind(this.id).then();
        let res = JSON.parse(JSON.stringify(data));
        if (res.code == 200) {
          console.log(res.code);
          this.expediente = res.data;
        }
      } else {
        // this.item = new Expediente();
      }
    } catch (error) {
      UturuncoUtils.showToas('Error inesperado', 'error');
    }
  }

  // async obtenerDetalle() {
  //   try {
  //     let criteria =
  //       '(c.expediente.id =' + this.expediente.id + ') AND c.activo=true';
  //     let data = await this.wsdl.doCriteria(criteria, 1, 1000).then();
  //     const result = JSON.parse(JSON.stringify(data));
  //     if (result.status == 200) {
  //       this.items = result.data;
  //     } else {
  //       this.items = [];
  //     }
  //   } catch (error) {}
  // }

  async doEdit() {
    try {
      this.procesando = true;
      const res = await this.wsdl.doUpdate(this.item, this.item.id).then();
      const result = JSON.parse(JSON.stringify(res));
      console.log('resul', result);
      if (result.status == 200) {
        UturuncoUtils.showToas('Se actualizó correctamente', 'success');
        this.back();
        this.finalizado.emit(true);
      } else if (result.status == 666) {
        // logout app o refresh token
      } else {
        alert('estoy aca');
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
      this.item.expediente.id = this.id;
      const res = await this.wsdl.doInsert(this.item).then();
      const result = JSON.parse(JSON.stringify(res));
      if (result.code == 200) {
        //this.item = result.status;
        UturuncoUtils.showToas('Se creó correctamente', 'success');
        this.back();
        this.finalizado.emit(true);
        this.procesando = false;
      } else if (result.code == 666) {
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

  onChange($event: Event) {
    /*Obtengo el archivo file*/
    const file = ($event.target as HTMLInputElement).files![0];

    /**previsualizar archivo */
    const filereader = new FileReader();
    // filereader.onload = function (e) {
    //   document.getElementById('visorArchivo')!.innerHTML =
    //     '<embed src="' + e.target!.result + '" width="400px" height="300px" alt="" ">';
    // }
    filereader.readAsDataURL(file);

    this.item.extencion = file.type;

    this.convertToBase64(file);
  }

  convertToBase64(file: File) {
    /*convertimos el archivo a base64*/
    this.archivo = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });

    this.archivo.subscribe((d) => {
      this.item.archivo = d;
    });
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }

  ver(item: Archivo) {
    let html =
      '<embed width="100%" height="300px" src="' +
      item.archivo +
      '" type="' +
      item.extencion +
      '" />';
    let s = this.sanitizer.bypassSecurityTrustHtml(html);
    // console.log(s)
    return s;
  }

  back() {
    this.router.navigateByUrl(this.entity.toLowerCase());
  }
}
