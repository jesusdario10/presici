import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Observable, Subject, pipe } from 'rxjs';
import { map } from "rxjs/operators"; 
import { Router } from '@angular/router';
import { ClienteModel } from '../../models/clienteModel';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    public _http: HttpClient,
    private _usuarioService : UsuarioService
  ){

  }
  //******************LISTAR CLIENTES*********************** */
  listarClientes(){
    let url = URL_SERVICIOS+'/clientes';
    url +='?token='+this._usuarioService.token;
    
    return this._http.get(url);
  }
  //******************LISTAR UN SOLO CLIENTE**************** */
  listarUnSoloCliente(id){
    let url = URL_SERVICIOS+'/clientes/'+id;
    url +='?token='+this._usuarioService.token;
    return this._http.get(url);
  }
  //******************CREAR CLIENTE************************* */  
  crearCliente(cliente:ClienteModel){
    let url = URL_SERVICIOS+'/clientes';
    url +='?token='+this._usuarioService.token;
    swal('!Exito¡', 'Cliente Creado Correctamente', 'success'); 
    return this._http.post(url, cliente);
    
  }
  //******************EDITAR  CLIENTE*********************** */
  editarCliente(cliente:ClienteModel, id){
    let url = URL_SERVICIOS+'/clientes/'+id;
    url +='?token='+this._usuarioService.token;
    swal('Actualizado', 'Cliente Actualizado Correctamente', 'success'); 
    return this._http.put(url, cliente);

  }
  //******************BUSCAR  CLIENTE*********************** */
  buscarCliente(termino: string):Observable<any>{
    let url = URL_SERVICIOS+'/busqueda/clientes/'+termino;
    url +='?token='+this._usuarioService.token;
    return this._http.get(url).pipe(
      map((resp:any)=>{
       return resp.clientes;
      })
    );
  }

}
