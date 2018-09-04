

export class SolicitudModel{
    item?:Atributo;
    valorTotal?:number;
    nombre?:string;
    estado?:string;
    cliente?:string;
    cargo?:string;
    _id?:string

    constructor(
        item: Atributo,
        valorTotal:number,
        nombre:string,
        estado:string,
        cliente:string,
        cargo:string,
        _id : string
    ){
        this.item = item;
        this.valorTotal = valorTotal;
        this.nombre = nombre;
        this.estado = estado;
        this.cliente = cliente;
        this.cargo = cargo;
        this._id = _id;
    }
}

export class Atributo{
    
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
   
}