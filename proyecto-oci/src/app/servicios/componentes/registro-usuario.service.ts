import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rol } from 'src/app/modelos/index.models';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegistroUsuarioService {
  other_header: any;
  api;

  constructor(private http: HttpClient) {
    this.api = environment.URLRegBus + 'usuario/';
    //this.api = "http://10.125.31.241:3000/unidad/";
  }
  /* particularidad de la entidad */

  getLogin(usuario: string, password: string) {
    this.other_header = UturuncoUtils.getHeader();
    let body = { usuario: usuario, clave: password };
    return this.http
      .post(this.api + 'find/loginSistemas', body, {
        headers: this.other_header,
      })
      .toPromise()
      .catch((err) => {
        return {
          code: 500,
          data: err.message,
          msg: 'Error en el servicio',
        };
      });
  }

  doFindDni(dni: any) {
    this.other_header = UturuncoUtils.getHeader();
    return this.http
      .post(this.api + 'find/usuarioSistema/' + dni, {
        headers: this.other_header,
      })
      .toPromise()
      .catch((err) => {
        return {
          code: 500,
          data: err.message,
          msg: 'Error en el servicio',
        };
      });
  }

  doLoginId(cifrado: any) {
    this.other_header = UturuncoUtils.getHeader();
    return this.http
      .post(this.api + 'find/idLogin/' + cifrado, { headers: this.other_header })
      .toPromise()
      .catch((err) => {
        return {
          code: 500,
          data: err.message,
          msg: 'Error en el servicio',
        };
      });
  }

  patchSistemaHabilitados(id: any, nombre: any, url: any, activo: any) {
    this.other_header = UturuncoUtils.getHeader();
    let body = {
      id: id,
      sistemaHabilitados: {
        nombre: nombre,
        url: url,
        activo: activo,
      },
    };
    console.log('body e', body);
    return this.http
      .patch(this.api + 'find/sistemaHabilitados/', body, {
        headers: this.other_header,
      })
      .toPromise()
      .catch((err) => {
        console.log('body', this.api);
        return {
          code: 500,
          data: err.message,
          msg: 'Error en el servicio',
        };
      });
  }
}
