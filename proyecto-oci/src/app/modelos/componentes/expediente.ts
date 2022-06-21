import { Persona } from './persona';
import { Tematica } from './tematica';
import { Unidad } from './unidad';

export class Expediente {
  id!: any;
  fecha!: any;
  tematica: Tematica;
  persona!: Persona; //usuario que crea
  unidad_origen: Unidad; /** */
  // archivo: any;
  entrada: boolean; /** si el verdadero es externa  y si es falso pasar unidad oci a unidad*/
  palabra_clave!: string;
  nro_nota!: string;
  observaciones!: string;

  constructor() {
    this.tematica = new Tematica();
    this.unidad_origen = new Unidad();
    this.persona = new Persona();
    this.entrada = false;  
  }
}
