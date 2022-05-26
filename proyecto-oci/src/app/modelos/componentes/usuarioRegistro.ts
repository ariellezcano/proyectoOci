import { Civil, Persona, Rol } from "../index.models";

//registro de usuarios
export class UsuariosRegistro{
    id!: number;
    persona: Persona;
    civil: Civil;
    usuario!: string;
    rol: Rol;

    constructor() {
        this.rol = new Rol();
        this.persona = new Persona();
        this.civil = new Civil();
    }
}