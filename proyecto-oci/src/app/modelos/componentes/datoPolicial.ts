import { Persona } from './persona';
import { Escalafon } from './escalafon';
import { Jerarquia } from './jerarquia';

export class DatoPolicial {
    id!: Number;
    plaza!: Number;
    credencialNro!: Number;
    decreto!: String;
    fecha!: Date;
    fechaDesde!: Date;
    persona!: Persona;
    escalafon!: Escalafon;
    jerarquia!: Jerarquia;
    activo!: Boolean;

    constructor() {
        this.persona = new Persona();
        this.escalafon = new Escalafon();
        this.jerarquia = new Jerarquia();

    }
}