

export class ItemModel{
    constructor(
        public _id: string,
        public tipovalvula : string,
        public tiposello : string,
        public diametro : string,
        public rating : string,
        public material : string,
        public otrosdatos : string,
        public tipomtto : string,
        public prioridad : string,
        public dificultad : string,
        public sitio : string,
        public cantidad : number,
        public solicitud :string,
        public valor: number

    ){
    }
}

