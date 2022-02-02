import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Tematica } from 'src/app/modelos/index.models';
import { TematicaService } from 'src/app/servicios/index.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lst-tematica',
  templateUrl: './lst-tematica.component.html',
  styleUrls: ['./lst-tematica.component.scss'],
})
export class LstTematicaComponent implements OnInit {
  // @ViewChild(FilTematicaComponent, { static: true })
  // fil!: FilTematicaComponent;
  @ViewChild('close')
  cerrar!: ElementRef;

  exportar: boolean = false;
  items: Tematica[];
  item: Tematica;

  procesando!: Boolean;
  public load!: boolean;

  entidad = 'lst-tematica';

  constructor(private wsdl: TematicaService, private router: Router) {
    this.load = false;
    this.item = new Tematica();
    this.items = [];
  }

  ngOnInit(): void {
    // this.items.push(JSON.parse(localStorage.getItem('b64')!));
    // console.log(this.items)
    // if (this.items == undefined) {
    //   this.items = [];
    // }
  }

  preDelete(item: Tematica) {
    this.item = new Tematica();
    this.item = item;

    Swal.fire({
      title: 'Esta Seguro?',
      text: '¡No podrás recuperar este archivo ' + item.nombre + '!',
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
    this.item = new Tematica();
    //this.fil.list();
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

  doFound(event: Tematica[]) {
    this.items = event;
  }
}
