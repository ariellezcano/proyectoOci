import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Civil } from 'src/app/modelos/index.models';
import {
  RegistroUsuarioService,
  UsuarioCivilService,
} from 'src/app/servicios/index.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';

@Component({
  selector: 'app-fil-usuarios',
  templateUrl: './fil-usuarios.component.html',
  styleUrls: ['./fil-usuarios.component.scss'],
})
export class FilUsuariosComponent implements OnInit {
  @Output()
  filter: EventEmitter<any[]> = new EventEmitter<any[]>();

  cargando: Boolean = false;
  procesando: Boolean;
  public search!: string;
  public crit = '';

  constructor(private wsdl: RegistroUsuarioService) {
    this.procesando = false;
    this.cargando = false;
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
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        this.filter.emit(result.data);
        this.cargando = false;
        this.procesando = false;
      } else {
        this.filter.emit([]);
        this.procesando = false;
        this.cargando = false;
        UturuncoUtils.showToas(result.msg, 'error');
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
}
