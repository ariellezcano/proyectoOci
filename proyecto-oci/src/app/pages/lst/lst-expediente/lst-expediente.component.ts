import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Archivo, Expediente } from 'src/app/modelos/index.models';
import { ExpedienteService } from 'src/app/servicios/componentes/expediente.service';
import { ArchivoService } from 'src/app/servicios/index.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';
import Swal from 'sweetalert2';
import { FilExpedienteComponent } from '../../filtros/fil-expediente/fil-expediente.component';

@Component({
  selector: 'app-lst-expediente',
  templateUrl: './lst-expediente.component.html',
  styleUrls: ['./lst-expediente.component.scss'],
})
export class LstExpedienteComponent implements OnInit {
  @ViewChild(FilExpedienteComponent, { static: false })
  fil!: FilExpedienteComponent;

  @ViewChild('close') cerrar!: ElementRef;

  exportar: boolean = false;
  items: Expediente[];
  item: Expediente;
  archivo: Archivo[];

  procesando!: Boolean;
  public load!: boolean;

  entidad = 'lst-expediente';

  constructor(
    private wsdlA: ArchivoService,
    private wsdl: ExpedienteService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.load = false;
    this.item = new Expediente();
    this.items = [];
    this.archivo = [];
  }

  ngOnInit(): void {
    // this.items.push(JSON.parse(localStorage.getItem('b64')!));
    // console.log(this.items)
    // if (this.items == undefined) {
    //   this.items = [];
    // }
  }

  preDelete(item: Expediente) {
    this.item = new Expediente();
    this.item = item;

    Swal.fire({
      title: 'Esta Seguro?',
      text: '¡No podrás recuperar este archivo ' + item.tematica.nombre + '!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Eliminar!',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.value) {
        this.delete();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        UturuncoUtils.showToas('Tu archivo esta seguro :)', 'warning');
      }
    });
  }

  async delete() {
    try {
      this.procesando = true;
      const res = await this.wsdl.doDelete(this.item.id).then();
      const result = JSON.parse(JSON.stringify(res));
      if (result.code == 200) {
        UturuncoUtils.showToas(result.msg, 'success');
        this.cancel();
      } else {
        UturuncoUtils.showToas(result.msg, 'error');
      }
    } catch (error: any) {
      UturuncoUtils.showToas('Excepción: ' + error.message, 'error');
    }
    this.procesando = false;
  }

  cancel() {
    this.item = new Expediente();
    this.fil.list();
  }

  async setResultCancel(event: Boolean) {
    UturuncoUtils.showToas('Operación cancelada', 'info');
  }

  setResult(event: any) {
    this.cancel();
  }

  evento(event: Boolean) {
    UturuncoUtils.showToas('Se creo correctamente', 'success');
    this.cerrar.nativeElement.click();
    //this.fil.list();
  }

  linkear(id?: Number) {
    this.router.navigateByUrl(this.entidad + '/abm/' + id);
  }
  linkeaArchivo(id?: Number) {
    this.router.navigateByUrl(this.entidad + '/abmArchivo/' + id);
  }

  colores(valor: any) {
    let color = '';
    switch (valor) {
      case 1:
        color = 't-success';
        break;
      case 11:
        color = 't-light';
        break;
      case 10:
        color = 't-violeta';
        break;
      case 8:
        color = 't-danger';
        break;
      case 9:
        color = 't-warning';
        break;
      default:
        color = 't-default';
        break;
    }
    return color;
  }

  // scroll(value: any[]) {
  //   console.log('valor', value);
  //   const valor = '';
  //   if (value.length > 5) {
  //     const valor = 'table-responsive';
  //     return valor;
  //   } else {
  //     return console.log('no hay mas de 10');
  //   }
  // }

  doFound(event: Expediente[]) {
    this.items = event;
  }

  async verArchivo(id: Expediente) {
    let data = await this.wsdlA.getCriteria(id.id, 1, 100).then();
    console.log(data);
    const result = JSON.parse(JSON.stringify(data));
    if (result.code == 200) {
      this.archivo = result.data.docs;
    } else if (result.status == 666) {
      // logout app o refresh token
    } else {
      console.log(result.msg);
      UturuncoUtils.showToas(result.msg, 'error');
    }
    this.procesando = false;
  }

  ver(a: Archivo) {
    let html =
      '<embed width="98%" height="400px" src="' +
      a.archivo +
      '" type="' +
      a.extencion +
      '" />';
    let s = this.sanitizer.bypassSecurityTrustHtml(html);
    //  console.log(s)

    return s;
  }
}
