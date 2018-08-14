

export class SolicitudModel{
    constructor(
        public  item:[{
            _id:string,
            campo1:string,
            campo2:string
        }],
        public numero: string,
        public medico: string,
        public _id : string,
    ){
    }
}

