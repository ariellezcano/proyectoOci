import { Tematica } from './tematica';
import { TipoArchivo } from './tipoArchivo';
import { Unidad } from './unidad';

export class Archivo {
  id!: any;
  fecha!: any;
  tipoArchivo: TipoArchivo;
  tematica: Tematica;
  unidadOrigen: Unidad; /** */
  // archivo: any;
  entrada!: boolean;/** si el verdadero es externa  y si es falso pasar unidad oci a unidad*/
  palabraClave!: string;
  nroNota!: string;
  observaciones!: string;

  constructor() {
    this.tipoArchivo = new TipoArchivo();
    this.tematica = new Tematica();
    this.unidadOrigen = new Unidad();
  }
}
