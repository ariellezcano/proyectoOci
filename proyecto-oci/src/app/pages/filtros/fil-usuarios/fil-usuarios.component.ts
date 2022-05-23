import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioOci, UsuariosRegistro } from 'src/app/modelos/index.models';
import {
  RegistroUsuarioService,
  UsuariosOciService,
} from 'src/app/servicios/index.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fil-usuarios',
  templateUrl: './fil-usuarios.component.html',
  styleUrls: ['./fil-usuarios.component.scss'],
})
export class FilUsuariosComponent implements OnInit {
  @Output()
  filter: EventEmitter<UsuariosRegistro> = new EventEmitter<UsuariosRegistro>();

  cargando: Boolean = false;
  procesando: Boolean;
  public search!: string;
  public crit = '';
  public id: any;
  public result: any;
  item: UsuarioOci;

  constructor(
    private route: Router,
    private wsdl: RegistroUsuarioService,
    private wsdlUsuarioOci: UsuariosOciService
  ) {
    this.procesando = false;
    this.cargando = false;
    this.item = new UsuarioOci();
  }

  ngOnInit() {}

  public async list() {
    try {
      this.cargando = true;
      this.procesando = true;
      if (this.search != undefined || this.search != '') {
        this.crit = this.search;
      }
      let data = await this.wsdl.doFindDni(this.crit).then();
      this.result = JSON.parse(JSON.stringify(data));
      if (this.result.code == 200) {
        this.id = this.result.data.usuario.id;
        this.verificarUsuario();
      } else if (this.result.code == 204) {
        Swal.fire({
          title: 'El usuario no existe!',
          text: 'Si el usuario que está por habilitrar es Personal Policial, por favor comuniquece con el área de Sistemas!, pero si el usuario es Personal Civil, puede crearlo. Al presionar el botón crear, le redirigira al formulario para su creación.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Crear!',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            this.route.navigate(['/lst-usuarios/abm/0']);
          }
        });
      }
      else {
        this.filter.emit();
        this.procesando = false;
        this.cargando = false;
        UturuncoUtils.showToas(this.result.msg, 'error');
      }
    } catch (error) {
      this.procesando = false;
      this.cargando = false;
      UturuncoUtils.showToas('Error', 'error');
    } finally {
      this.procesando = false;
      this.cargando = false;
    }
  }

  async verificarUsuario() {
    let data1 = await this.wsdlUsuarioOci.doFind(this.id).then();
    const result1 = JSON.parse(JSON.stringify(data1));
    if (result1.code == 200) {
      this.item = result1.data;
      if (result1.data.baja) {
        Swal.fire({
          title: 'El usuario se encuentra dado de baja',
          text: 'DESEA HABILITARLO!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si!',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            this.editBaja();
          }
        });
      } else {
        Swal.fire({
          title: 'El usuario ya se encuentra habilitado!',
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
        });
      }
    } else {
      this.filter.emit(this.result.data.usuario);
      this.cargando = false;
      this.procesando = false;
    }
  }

  async editBaja() {
    //fecha y id de quien da de baja
    this.item.baja = false;
    let data2 = await this.wsdlUsuarioOci.doUpdate(this.item.id, this.item).then();
    const result2 = JSON.parse(JSON.stringify(data2));
    if (result2.code == 200) {
      Swal.fire('El usuario ha sido habilitado correctamente!.', 'success');
      this.back();
    }
  }

  back() {
    this.route.navigate(['/lst-usuarios']);
  }
}
