import { Persona } from './persona';
import { Tematica } from './tematica';
import { Unidad } from './unidad';

export class Expediente {
  id!: any;
  fecha!: any;
  tematica: Tematica;
  persona!: Persona; //usuario que crea
  unidadOrigen: Unidad; /** */
  // archivo: any;
  entrada!: boolean; /** si el verdadero es externa  y si es falso pasar unidad oci a unidad*/
  palabraClave!: string;
  nroNota!: string;
  observaciones!: string;

  constructor() {
    this.tematica = new Tematica();
    this.unidadOrigen = new Unidad();
  }
}
