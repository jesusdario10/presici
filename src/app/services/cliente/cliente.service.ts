import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Observable, Subject, pipe } from 'rxjs';
import { map } from "rxjs/operators"; 
import { Router } from '@angular/router';
import { ClienteModel } from '../../models/clienteModel';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    public _http: HttpClient
  ){

  }
  //******************LISTAR CLIENTES*********************** */
  listarClientes(){
    let url = URL_SERVICIOS+'/clientes';
    return this._http.get(url);
  }
  //******************LISTAR UN SOLO CLIENTE**************** */
  listarUnSoloCliente(id){
    let url = URL_SERVICIOS+'/clientes/'+id;
    return this._http.get(url);
  }
  //******************CREAR CLIENTE************************* */  
  crearCliente(cliente:ClienteModel){
    let url = URL_SERVICIOS+'/clientes';
    swal('!Exito¡', 'Cliente Creado Correctamente', 'success'); 
    return this._http.post(url, cliente);
  }
  //******************EDITAR  CLIENTE*********************** */
  editarCliente(cliente:ClienteModel, id){
    let url = URL_SERVICIOS+'/clientes/'+id;
    swal('Actualizado', 'Cliente Actualizado Correctamente', 'success'); 
    return this._http.put(url, cliente);

  }
  //******************BUSCAR  CLIENTE*********************** */
  buscarCliente(termino: string):Observable<any>{
    let url = URL_SERVICIOS+'/busqueda/clientes/'+termino;
    return this._http.get(url).pipe(
      map((resp:any)=>{
       return resp.clientes;
      })
    );
  }

}
