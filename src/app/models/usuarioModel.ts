export class UsuariosModel{
    constructor(
        public nombre: string,
        public correo: string,
        public password: string,
        public img?:string,
        public role? : string,
        public google? : string,
        public _id? : string
    ){
    }
}
