import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { UsuarioOci, UsuariosRegistro } from 'src/app/modelos/index.models';
import { UsuariosOciService } from 'src/app/servicios/componentes/usuarios-oci.service';
import { UsuarioService } from 'src/app/servicios/index.service';
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

  constructor(private route: Router, private wsdl: UsuariosOciService) {
    this.item = new UsuariosRegistro();
    this.dtOci = new UsuarioOci();
    this.tipoPersona = '';
    this.proceso = false;
  }

  ngOnInit(): void {}

  public async insertOci() {
    this.dtOci.usuarioCrea = UturuncoUtils.getSession('user');
    this.dtOci.fechaAlta = moment(this.dtOci.fechaAlta).format('YYYY-MM-DD');
    try {
      let data = await this.wsdl.doInsert(this.dtOci).then();
      console.log('data', data);
      let res = JSON.parse(JSON.stringify(data));
      console.log('res', res);
      if (res.code == 200) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario habilitado correctamente!',
          showConfirmButton: false,
          timer: 1500,
        });
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
    if (event.civil.id > 0 || event.civil != null) {
      this.tipoPersona = 'Personal Civil';
      this.dtOci.civil = event.civil.id;
      this.dtOci.datosPersonal.nombre = event.civil.nombre;
      this.dtOci.datosPersonal.apellido = event.civil.apellido;
      this.dtOci.datosPersonal.norDni = event.civil.norDni;
      this.dtOci.usuario = event.id;
    }

    if (event.persona.id > 0 || event.persona != null) {
      this.tipoPersona = 'Personal Policial';
      this.dtOci.persona = event.persona.id;
      this.dtOci.datosPersonal.nombre = event.persona.nombre;
      this.dtOci.datosPersonal.apellido = event.persona.apellido;
      this.dtOci.datosPersonal.norDni = event.persona.norDni;
      this.dtOci.usuario = event.id;
    }
  }
  back() {
    this.route.navigate(['lst-usuarios']);
  }
}
