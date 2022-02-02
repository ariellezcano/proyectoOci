import { Expediente } from './expediente';

export class Archivo {
  id!: number;
  expediente!: Expediente;
  archivo: any;
  extension!: String;
  constructor() {
    this.expediente = new Expediente();
  }
}
