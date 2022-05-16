import {  Persona, Usuario } from "../index.models";

export class UsuarioOci{

    id!: number;
    usuarioCrea!: number;
    fechaAlta!: Date;
    persona!: number;
    civil!: number;
    datosPersonal!: string;
    fechaBaja!: Date;

    constructor() {

    }
}