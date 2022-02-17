import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UturuncoUtils } from '../../utils/uturuncoUtils';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  other_header: any;
  api;

  constructor(private http: HttpClient) {
    this.api = environment.URLPOLD + 'usuario/';
  }

  /* particularidad de la entidad */

  getList(page: string | number, limit: string | number) {
    this.other_header = UturuncoUtils.getHeader();
    return this.http
      .get(this.api + page + '/' + limit, { headers: this.other_header })
      .toPromise()
      .catch((err) => {});
  }

  doUpdate(evento: any, id: string | number) {
    this.other_header = UturuncoUtils.getHeader();
    return this.http
      .put(this.api + id, evento, { headers: this.other_header })
      .toPromise()
      .catch((err) => {});
  }

  doDelete(id: string | number) {
    this.other_header = UturuncoUtils.getHeader();
    return this.http
      .delete(this.api + id, { headers: this.other_header })
      .toPromise()
      .catch((err) => {});
  }

  doInsert(evento: any) {
    this.other_header = UturuncoUtils.getHeader();
    return this.http
      .post(this.api, evento, { headers: this.other_header })
      .toPromise()
      .catch((err) => {});
  }

  doCriteria(
    criteria: any,
    one: any,
    populate: any,
    sort: any,
    page: string | number,
    limit: string | number
  ) {
    this.other_header = UturuncoUtils.getHeader();

    const cr = {
      criteria: criteria,
      one: one,
      populate: populate,
      sort: sort,
    };

    return this.http
      .post(this.api + 'criteria/' + page + '/' + limit, cr, {
        headers: this.other_header,
      })
      .toPromise()
      .catch((err) => {});
  }

  doLogin(dni: any, clave: any) {
    this.other_header = UturuncoUtils.getHeader();
    let criteria = {
      user: dni,
      pass: clave,
    };

    return this.http
      .post(this.api + 'login/', criteria, this.other_header)
      .toPromise()
      .catch((err) => {
        console.log(err);
      });
  }

  doRestorePass(dni: any, credencial: any, fecha: any) {
    this.other_header = UturuncoUtils.getHeader();
    let body = {
      dni: dni,
      credencial: credencial,
      fecha: fecha,
    };
    return this.http
      .post(this.api + 'restore/', body, this.other_header)
      .toPromise()
      .catch((err) => {
        console.log(err);
      });
  }

  doChangePass(id: any, oldClave: any, newClave: any) {
    this.other_header = UturuncoUtils.getHeader();
    let body = {
      id: id,
      oldPassword: oldClave,
      newPassword: newClave,
    };
    return this.http
      .post(this.api + 'change/', body, this.other_header)
      .toPromise()
      .catch((err) => {
        console.log(err);
      });
  }
}
