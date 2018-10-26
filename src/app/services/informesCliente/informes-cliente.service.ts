import { Injectable } from '@angular/core';
import { MantenimientoModel } from '../../models/mantenimientoModel';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from "rxjs/operators"; 

@Injectable({
  providedIn: 'root'
})
export class InformesClienteService {
  

  constructor(
    private _http : HttpClient
  ) { }

  mantenimientoClienteDona(mantenimiento:MantenimientoModel){
    let url = URL_SERVICIOS+'/infocliente/donamanten/';

    return this._http.post(url, mantenimiento).pipe(
      map((resp:any)=>{
        
        return resp;
      })
    )
  }
  mantenimientosClienteLinea(mantenimiento:MantenimientoModel){
    let url = URL_SERVICIOS+'/infocliente/lineamanten/';

    return this._http.post(url, mantenimiento).pipe(
      map((resp:any)=>{
        return resp;
      })
    )
  }
  mantenimientoClienteDonaSolicitud(mantenimiento: MantenimientoModel){
    let url = URL_SERVICIOS+'/infocliente/donasolici';

    return this._http.post(url, mantenimiento).pipe(
      map((resp:any)=>{
        return resp;
      })
    )
  }
}
