import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { UsuarioOci, UsuariosRegistro } from 'src/app/modelos/index.models';
import { RegistroUsuarioService, UsuariosOciService } from 'src/app/servicios/index.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-consulta-usuario',
  templateUrl: './abm-consulta-usuario.component.html',
  styleUrls: ['./abm-consulta-usuario.component.scss'],
})
export class AbmConsultaUsuarioComponent implements OnInit {
  form!: FormGroup;

  item: UsuariosRegistro;
  dtOci!: UsuarioOci;
  proceso: Boolean;
  tipoPersona: string;
  rol: boolean;

  public nombre: string = "OCI";
  public url: string = "https://policiadigital.chaco.gob.ar/oci/"
  public activo: boolean = true;


  constructor(private route: Router, private wsdl: UsuariosOciService, private wsdlRegistro: RegistroUsuarioService) {
    this.item = new UsuariosRegistro();
    this.dtOci = new UsuarioOci();
    this.tipoPersona = '';
    this.proceso = false;
    this.rol = false;
  }

  ngOnInit(): void {}

  public async insertOci() {

    this.dtOci.usuarioCrea = UturuncoUtils.getSession('user');
    this.dtOci.fechaAlta = moment(this.dtOci.fechaAlta).format('YYYY-MM-DD');
    if (this.rol == true) {
      this.dtOci.datosPersonal.rol = 'VISTA';
    }
    //console.log('usuario', this.dtOci);
    try {
      let data = await this.wsdl.doInsert(this.dtOci).then();
      let res = JSON.parse(JSON.stringify(data));
      if (res.code == 200) {
        try {
          let data = await this.wsdlRegistro.patchSistemaHabilitados(this.dtOci.usuario, this.nombre, this.url, this.activo).then();
          //console.log("res adata",data)
        } catch (error) {
          //console.log("respuestaerror", error);
        }
        //console.log("respuesta", res);

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario habilitado correctamente!',
          showConfirmButton: false,
          timer: 1500,
        });
        this.back();
      } else {
      }
    } catch (error) {}
  }

  pregunta() {
    Swal.fire({
      title: 'Estás seguro?',
      text: 'Usted está por habilitar al usuario!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.insertOci();
      }
    });
  }

  doFound(event: UsuariosRegistro) {
    this.proceso = true;
    //console.log('event', event);
    if (event.civil != null) {
      //console.log('Personal civil', event);
      this.dtOci.datosPersonal.tipoPersona = 'Personal Civil';
      this.dtOci.civil = event.civil.id;
      this.dtOci.datosPersonal.nombre = event.civil.nombre;
      this.dtOci.datosPersonal.apellido = event.civil.apellido;
      this.dtOci.datosPersonal.norDni = event.civil.norDni;
      this.dtOci.datosPersonal.usuario = event.usuario;
      this.dtOci.datosPersonal.rol = event.rol.nombre;
      this.dtOci.usuario = event.id;
    }
    if (event.persona != null) {
      //console.log('Personal Policial', event);
      this.dtOci.datosPersonal.tipoPersona = 'Personal Policial';
      this.dtOci.persona = event.persona.id;
      this.dtOci.datosPersonal.nombre = event.persona.nombre;
      this.dtOci.datosPersonal.apellido = event.persona.apellido;
      this.dtOci.datosPersonal.norDni = event.persona.norDni;
      this.dtOci.datosPersonal.usuario = event.usuario;
      this.dtOci.datosPersonal.rol = event.rol.nombre;
      this.dtOci.usuario = event.id;
    }
  }

  back() {
    this.route.navigate(['lst-usuarios']);
  }
}
