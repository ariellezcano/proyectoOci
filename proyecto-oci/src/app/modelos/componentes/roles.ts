export class Roles {
    id!: number;
    nombre!: string;
    activo: boolean;

    constructor() { 
        this.activo = true;
    }
}