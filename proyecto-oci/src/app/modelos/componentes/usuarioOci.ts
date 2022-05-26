import {  Persona, Usuario } from "../index.models";

export class UsuarioOci{
    id!: number;
    usuarioCrea!: any;
    usuario!: number;
    fechaAlta!: any;
    persona!: any;
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
        this.datosPersonal = {usuario: "",norDni: "", nombre:"", apellido:"", rol:"", tipoPersona:""};
        this.activo = true;
    }
}