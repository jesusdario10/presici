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

  constructor(
    private _http : HttpClient
  ) { }
  //CARGAR TIPOS DE VALVULAS
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
  //LISTAR ACTIVIDADES DEL TIPO DE VALVULA
}
