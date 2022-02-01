import { Expediente } from './expediente';

export class Archivo {
  id!: Number;
  expediente!: Expediente;
  archivo: any;
  extension!: String;
  constructor() {
    this.expediente = new Expediente();
  }
}
