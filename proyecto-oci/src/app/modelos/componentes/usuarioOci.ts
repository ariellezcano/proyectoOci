import {  Persona, Usuario } from "../index.models";

export class UsuarioOci{
    id!: number;
    usuarioCrea!: number;
    usuario!: number;
    fechaAlta!: any;
    persona!: number;
    civil!: number;
    datosPersonal: any;
    fechaBaja!: Date;
    usuarioBaja!: number;
    baja!:boolean;
    activo!: boolean;
    created_at?: Date;
    updated_at?: Date;
    delete_at?: Date;

    constructor() {
        this.datosPersonal = {norDni: "", nombre:"", apellido:""};
        this.activo = true;
    }
}