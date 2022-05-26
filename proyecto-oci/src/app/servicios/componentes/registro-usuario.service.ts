import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
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
    let body = {usuario:usuario, clave:password};
    return this.http
      .post(
        this.api + 'find/loginSistemas', body,
        { headers: this.other_header }
      )
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
      .post(this.api + 'find/usuarioSistema/'+ dni,
      { headers: this.other_header })
      .toPromise()
      .catch((err) => {
        return {
          code: 500,
          data: err.message,
          msg: 'Error en el servicio',
        };
      });
    }

  }
