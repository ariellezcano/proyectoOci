import { Tematica } from './tematica';
import { TipoArchivo } from './tipoArchivo';
import { Unidad } from './unidad';

export class Archivo {
  id!: any;
  fecha!: any;
  tipoArchivo: TipoArchivo;
  tematica: Tematica;
  unidadOrigen: Unidad;
  archivo!: string;
  entrada!: boolean;
  palabraClave!: string;
  nroNota!: string;
  observaciones!: string;

  constructor() {
    this.tipoArchivo = new TipoArchivo();
    this.tematica = new Tematica();
    this.unidadOrigen = new Unidad();
  }
}
