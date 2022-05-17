import { Civil, Persona } from "../index.models";

//registro de usuarios
export class UsuariosRegistro{
    id!: number;
    persona!: Persona;
    civil!: Civil;
   // usuario!: number;
   ;

    constructor() {
        this.persona = new Persona();
        this.civil = new Civil();
    }
}