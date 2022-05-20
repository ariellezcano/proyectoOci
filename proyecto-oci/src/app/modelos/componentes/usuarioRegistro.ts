import { Civil, Persona, Roles } from "../index.models";

//registro de usuarios
export class UsuariosRegistro{
    id!: number;
    persona!: Persona;
    civil!: Civil;
    roles: Roles;
   // usuario!: number;
   ;

    constructor() {
        this.roles = new Roles();
        this.persona = new Persona();
        this.civil = new Civil();
    }
}