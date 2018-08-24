

export class TareaModel{

    nombre?:string;
    tipomtto1?:string;
    tipomtto2?:string;
    tipomtto3?:string;
    valor?:number;
    _id?:string

    constructor(
        nombre:string,
        tipomtto1:string,
        tipomtto2:string,
        tipomtto3:string,
        valor:number,
        _id : string
    ){
        this.nombre = nombre;
        this.tipomtto1= tipomtto1;
        this.tipomtto2= tipomtto2;
        this.tipomtto3= tipomtto3;
        this.valor = valor;
        this._id = _id;
    }
}

