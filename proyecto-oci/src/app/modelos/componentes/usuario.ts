import { Persona } from './persona';
import { Roles } from './roles';

export class Usuario {
    id: number;
    nombre: string;
    clave: string;
    activo: boolean;
    persona: Persona;
    rol: Roles;

    constructor() { 
        this.id = 0;
        this.nombre = "";
        this.clave = "";
        this.activo = true;
        this.persona = new Persona();
        this.rol = new Roles();
    }
}