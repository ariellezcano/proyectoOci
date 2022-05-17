import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioOci, UsuariosRegistro } from 'src/app/modelos/index.models';
import {
  UsuarioService,
} from 'src/app/servicios/index.service';

@Component({
  selector: 'app-abm-consulta-usuario',
  templateUrl: './abm-consulta-usuario.component.html',
  styleUrls: ['./abm-consulta-usuario.component.scss'],
})
export class AbmConsultaUsuarioComponent implements OnInit {
  form!: FormGroup;

  item: UsuariosRegistro;
  dtOci!: UsuarioOci;

  tipoPersona: string;

  constructor(private route: Router, private wsdl: UsuarioService) {
    this.item = new UsuariosRegistro();
    this.dtOci = new UsuarioOci();
    this.tipoPersona = "";
  }

  ngOnInit(): void {}

  public async insertOci() {
    try {

      console.log("this.items",this.dtOci)

    } catch (error) {}
  }

  doFound(event: UsuariosRegistro) {
    if(event.civil.id > 0 || event.civil != null) {
      this.dtOci.civil = event.civil.id;
      this.dtOci.datosPersonal.nombre = event.civil.nombre;
      this.dtOci.datosPersonal.apellido = event.civil.apellido;
      this.dtOci.datosPersonal.norDni = event.civil.norDni;
      this.tipoPersona = "Personal Civil"
    }
    if(event.persona.id > 0 || event.persona != null){
      this.dtOci.persona = event.persona.id;
      this.dtOci.datosPersonal.nombre = event.persona.nombre;
      this.dtOci.datosPersonal.apellido = event.persona.apellido;
      this.dtOci.datosPersonal.norDni = event.persona.norDni;
      this.tipoPersona = "Personal Policial"
    }
  }
}
