import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Civil, UsuarioOci } from 'src/app/modelos/index.models';
import { UsuariosOciService } from 'src/app/servicios/componentes/usuarios-oci.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';
import Swal from 'sweetalert2';
import { FilUsuarioOciComponent } from '../../filtros/fil-usuario-oci/fil-usuario-oci.component';
import { FilUsuariosComponent } from '../../filtros/fil-usuarios/fil-usuarios.component';

@Component({
  selector: 'app-lst-usuarios',
  templateUrl: './lst-usuarios.component.html',
  styleUrls: ['./lst-usuarios.component.scss'],
})
export class LstUsuariosComponent implements OnInit {
  @ViewChild(FilUsuarioOciComponent, { static: false })
  fil!: FilUsuarioOciComponent;

  @ViewChild('close')
  cerrar!: ElementRef;

  exportar: boolean = false;
  items: UsuarioOci[];
  item: UsuarioOci;

  procesando!: Boolean;
  public load!: boolean;

  TipoUsuario!: string;

  entidad = 'lst-usuarios';

  constructor(private wsdl: UsuariosOciService, private router: Router) {
    this.load = false;
    this.item = new UsuarioOci();
    this.items = [];
  }

  ngOnInit(): void {

  }

  preDelete(item: UsuarioOci) {
    this.item = new UsuarioOci();
    this.item = item;

    Swal.fire({
      title: 'Está Seguro?',
      text: '¡Deberá volver a habilitar el usuario si lo necesita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Inhabilitar!',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.value) {
        this.delete();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        UturuncoUtils.showToas('Operacion cancelada', 'warning');
      }
    });
  }

  async delete() {
    try {
      let date = new Date()
      this.procesando = true;
      this.item.baja = true;
      this.item.fechaBaja = moment(date).format('YYYY-MM-DD');
      this.item.usuarioBaja = UturuncoUtils.getSession('user');
      console.log('usuario', this.item);
      const res = await this.wsdl.doUpdate(this.item.id, this.item).then();
      const result = JSON.parse(JSON.stringify(res));
      console.log("res", result)
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
    this.item = new UsuarioOci();
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

  habilitar() {
    this.router.navigateByUrl('/busqueda-usuario/abm');
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

  doFound(event: UsuarioOci[]) { 
    this.items = [];  
    event.forEach(element => {
      if(!element.baja){
        this.items.push(element);
      }
    });
  }

  tipoUsuario(item: UsuarioOci) {
    if (this.item.persona != undefined) {
      console.log('item ', item.persona);
      this.TipoUsuario = 'Personal Policial';
    } else {
      this.TipoUsuario = 'Personal Civil';
    }
    return this.TipoUsuario;
  }

   
}
