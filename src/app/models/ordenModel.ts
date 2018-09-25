

export class OrdenModel{
    solicitud?:string;
    cliente?:string;
    ejecutado?:number;
    cantidad?:number;
    valvulas?:Caracteristicas;
    estado?:string;
    _id?:string;

    constructor(
        solicitud:string,
        cliente:string,
        ejecutado:number,
        cantidad:number,
        valvulas:Caracteristicas,
        estado:string,
        _id?:string
    ){
        this.solicitud = solicitud;
        this.cliente = cliente;
        this.ejecutado = ejecutado;
        this.cantidad = cantidad;
        this.valvulas = valvulas;
        this.estado = estado;
        this._id = _id;
    }
}

export class Caracteristicas{
    /*public tareas: Tareas;*/
    public tipovalvula : string;
    public tiposello : string;
    public diametro : string;
    public rating : string;
    public material : string;
    public otrosdatos : string;
    public tipomtto : string;
    public prioridad : string;
    public dificultad : string;
    public sitio : string;
    public cantidad : number;
    public valor : number;
    public tareas? : Tarea;
}

export class Tarea{
    estado:string;
    nombre : string;
    tipo: string;
}