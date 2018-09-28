
export class ValvulaModel{
    nombre?:string;
    actividades? : Actividades;
    

    constructor(
        actividades:Actividades,
        nombre:string,
        tipo:string
    ){
        this.actividades = actividades,
        this.nombre = nombre
        
    }
}

export class Actividades{
    nombre?:string;
    tipo?: string;
    tiempo? : number;
    estado? : boolean;
}