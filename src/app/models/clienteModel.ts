export class ClienteModel{
    nombre?:string;
    nit?:string;
    email?:string;
    direccion?:string;
    telefono?:string;
    celular1?:string;
    celular2?:string;
    contacto?:string;
    _id?:string;

    constructor(
        nombre:string,
        nit:string,
        email:string,
        direccion:string,
        telefono:string,
        celular1:string,
        celular2:string,
        contacto:string,
        _id:string
    ){
        this.nombre = nombre;
        this.nit=nit;
        this.email = email;
        this.direccion = direccion;
        this.telefono = telefono;
        this.celular1 = celular1;
        this.celular2 = celular2;
        this.contacto = contacto;
        this._id = _id;

    }

}