import { Sexo, Unidad } from "../index.models";

export class Civil{
    
    id!: number;
    sexo!: Sexo;
    apellido!:string;
    nombre!: string;
    norDni!:number;
    grupoS!:string;
    factor!:string;
    fechaNacimiento!: any;
    domicilio!: any;
    fechaFinContrato!: any;
    unidad!: Unidad;
    activo!: boolean;
    created_at?: any;
    updated_at?: any;
    deleted_at?:any;

    constructor() {
        this.sexo = new Sexo();
        this.unidad = new Unidad();
        this.fechaFinContrato = new Date();
        this.fechaNacimiento = new Date();
    }
}