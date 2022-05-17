import {  Persona, Usuario } from "../index.models";

export class UsuarioOci{

    id!: number;
    usuarioCrea!: number;
    usuario!: number;
    fechaAlta!: Date;
    persona!: number;
    civil!: number;
    datosPersonal!: Persona;
    fechaBaja!: Date;
    usuarioBaja!: number;
    baja!:boolean;
    activo!: boolean;
    created_at?: Date;
    updated_at?: Date;
    delete_at?: Date;

    constructor() {
        this.datosPersonal = new Persona();
    }
}