
export class CargoModel{
    nombre: string;
    valorHora : number;
    _id?:string;

    constructor(nombre:string, valorHora:number, _id:string){
        this.nombre = nombre;
        this.valorHora = valorHora;
        this._id = _id;
    }
}