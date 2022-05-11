import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioCivilService {

  URL: string = environment.URL + "civil/";

  constructor() { }
}
