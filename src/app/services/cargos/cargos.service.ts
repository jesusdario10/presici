import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Observable, Subject, pipe } from 'rxjs';
import { map } from "rxjs/operators"; 
import { Router } from '@angular/router';
import { CargoModel } from '../../models/cargoModel';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class CargosService {

  constructor(
    private _http:HttpClient,
    private _usuarioService : UsuarioService
  ) { 

  }
  /*****************LISTAR CARGOS********************** */
  listarCargos(){
    let url =URL_SERVICIOS+'/cargos';
    url+='?token='+this._usuarioService.token;
    return this._http.get(url);
  }
  /**************LISTAR 1 CARGO POR ID ++++++++++++++++ */
  listarUnCargo(id){
    let url =URL_SERVICIOS+'/cargos/'+id;
    url+='?token='+this._usuarioService.token;
    return this._http.get(url);
  }
  /**************ACTUALZIAR UN CARGO ++++++++++++++++ */
  actualizarCargo(cargo:CargoModel, id){
    let url =URL_SERVICIOS+'/cargos/'+id;
    url+='?token='+this._usuarioService.token;
    swal('Actualizado', 'Cliente Actualizado Correctamente', 'success'); 
    return this._http.put(url, cargo);
  }
    //******************CREAR Cargo************************* */  
    crearCargo(cargo:CargoModel){
      let url = URL_SERVICIOS+'/cargos';
      url+='?token='+this._usuarioService.token;
      swal('!Exito¡', 'Cargo Creado Correctamente', 'success'); 
      return this._http.post(url, cargo);
    }
}
