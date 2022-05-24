import { Persona } from './persona';
import { Rol } from './roles';

export class Usuario {
    id: number;
    nombre: string;
    clave: string;
    activo: boolean;
    persona: Persona;
    rol: Rol;

    constructor() { 
        this.id = 0;
        this.nombre = "";
        this.clave = "";
        this.activo = true;
        this.persona = new Persona();
        this.rol = new Rol();
    }
}