import { Sexo, Unidad } from "../index.models";

export class UsuarioCivil{
    
    id?: number;
    sexo!: Sexo;
    apellido!:string;
    nombre!: String;
    norDni!:number;
    grupoS!:string;
    factor!:string;
    fechaNacimiento!: any;
    domicilio!: any;
    fechaFinContrato!: Date;
    unidad?: Unidad;
    activo?: boolean;
    created_at?: any;
    updated_at?: any;
    deleted_at?:any;

    constructor() {
        this.sexo = new Sexo();
        this.unidad = new Unidad();


    }
}