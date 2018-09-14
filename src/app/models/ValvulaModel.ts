
export class ValvulaModel{
    nombre?:string;
    actividades? : Actividades;

    constructor(
        actividades:Actividades,
        nombre:string
    ){
        this.actividades = actividades,
        this.nombre = nombre
    }
}

export class Actividades{
    nombre?:string;
}