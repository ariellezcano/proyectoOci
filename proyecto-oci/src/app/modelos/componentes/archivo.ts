import { Expediente } from './expediente';

export class Archivo {
  id!: number;
  expediente!: Expediente;
  archivo: any;
  extencion!: String;
  constructor() {
    this.expediente = new Expediente();
  }
}
