import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, pipe } from 'rxjs';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from "rxjs/operators"; 
import { throwError } from "rxjs/internal/observable/throwError"; 
import { Router } from '@angular/router';

import { MantenimientoModel } from '../../models/mantenimientoModel';


@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {
  mantenimiento : MantenimientoModel

  constructor(
    private _http : HttpClient
  ) { }
  //=======================BUSCAR MANTENIMIENTO POR ID====================//
  encontrarUnMantenimiento(id):Observable<any>{
    let url = URL_SERVICIOS+'/mantenimientos/manten/'+id;
     return this._http.get(url).pipe(
      map((resp:any)=>{
        console.log(resp);
        return resp;
      })
    );
  }
  
  //==================ACTUALIZAR SERIALES==================================//
  actualizarSerialValvula(mantenimiento:MantenimientoModel, id, index):Observable<any>{
      let url = URL_SERVICIOS+'/mantenimientos/'+id+'/'+index;
      return this._http.put(url, mantenimiento).pipe(
        map((resp:any)=>{
          console.log(resp);
          

          return resp;
        })
      )
    }
}
