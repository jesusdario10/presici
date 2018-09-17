import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, pipe } from 'rxjs';
import { URL_SERVICIOS } from '../../config/config';
import { ValvulaModel } from '../../models/ValvulaModel';
import { map, catchError } from "rxjs/operators"; 
import { throwError } from "rxjs/internal/observable/throwError"; 
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ValvulasService {
  idTipoValvula : string;

  constructor(
    private _http : HttpClient
  ) { }
  //OBTENER TIPO DE VALVULA
  /*esta funcion lo que hace es obtener el id por url
    del tipo de valvula para luego insertar los items*/
  obtenerTipodeValvula(){
    let urlActual = window.location.href;
    let extraer = urlActual.split('/');
    let tipovalvula = extraer[5];
    this.idTipoValvula = tipovalvula;
    console.log(this.idTipoValvula);

  }
  //LISTAR TIPOS DE VALVULAS
  cargarValvulas():Observable<any>{
    let url = URL_SERVICIOS+'/tipovalvula';
    return this._http.get(url).pipe(
      map((resp:any)=>{
        return resp.tipovalvulas
      })
    )
  }
  //CREAR TIPOS DE VALVULA
  crearValvulas(valvula: ValvulaModel){
    let url = URL_SERVICIOS+'/tipovalvula/crear';
    return this._http.post(url, valvula).pipe(
      map((resp:any)=>{
        console.log(resp);
        sweetAlert("!Exito", "Tipo de Valvula Creada Correctamente", "success");
        return resp
      })
    )
  }
  //INSERTAR ACTIVIDADES A LOS TIPOS DE VALVULAS
  insertarActividades(valvulaActividades: ValvulaModel){
    let url = URL_SERVICIOS+'/tipovalvula/'+this.idTipoValvula;

    return this._http.post(url, valvulaActividades).pipe(
      map((resp:any)=>{
        swal('Ok', 'Actividad creada Correctamente', 'success');
        console.log("Insertando");
        console.log(resp);
        return resp.tipovalvula;
      })
    )
  }
  //LISTAR ACTIVIDADES DEL TIPO DE VALVULA
  listarActividades(){
    let url = URL_SERVICIOS+'/tipovalvula/'+this.idTipoValvula;

    return this._http.get(url).pipe(
      map((resp:any)=>{
        return resp;
      })
    )
  }
}
