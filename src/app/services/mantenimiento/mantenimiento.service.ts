import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, pipe } from 'rxjs';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from "rxjs/operators"; 
import { throwError } from "rxjs/internal/observable/throwError"; 
import { Router } from '@angular/router';
import { MantenimientoModel } from '../../models/mantenimientoModel';
import { UsuarioService } from '../service.index';


@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {
  mantenimiento : MantenimientoModel

  constructor(
    private _http : HttpClient, 
    private _usuarioService : UsuarioService
  ) { }
  //=======================BUSCAR MANTENIMIENTO POR ID====================//
  encontrarUnMantenimiento(id):Observable<any>{
    let url = URL_SERVICIOS+'/mantenimientos/manten/'+id;
     return this._http.get(url).pipe(
      map((resp:any)=>{
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
  //=================ACTUALIZAR ESTADO DE LAS TAREAS DE LOS MANTENIMIENTOS DE LS VALVULAS ==================//
  actualizarEstadodeTareasdeValvulas(mantenimiento:MantenimientoModel, id, index):Observable<any>{
    let url = URL_SERVICIOS+'/mantenimientos/manten/estadoactividades/'+id+'?index='+index;

    return this._http.put(url, mantenimiento).pipe(
      map((resp:any)=>{
        swal('Actividad Finalizada', 'Se Finalizo Correctamente la Actividad', 'success');
        return resp;
      })
    )
  }
  //=================ACTUALIZAR OBSERVACIONES DE LOS MANTENIMIENTOS ==================//
  actualizarObsMtto(mantenimiento:MantenimientoModel, id):Observable<any>{
    let url = URL_SERVICIOS+'/mantenimientos/manten/observaciones/'+id

    return this._http.put(url, mantenimiento).pipe(
      map((resp:any)=>{
        swal('Exito', 'Observaciones Actualizadas ', 'success');
        return resp;
      })
    )
  }
  //=================ACTUALIZAR EL ESTADO DE LOS MANTENIMIENTOS ==================//
  actualizarEstadoMtto(mantenimiento:MantenimientoModel, id):Observable<any>{
    let url = URL_SERVICIOS+'/mantenimientos/manten/estado/'+id

    return this._http.put(url, mantenimiento).pipe(
      map((resp:any)=>{
        swal('Exito', 'Estado Actualizado ', 'success');
        return resp;
      })
    )
  }
  //========================TRAER UNA SOLICITUD==========================================// 
  traelaSolicituddelMantenimiento(id){
    let url = URL_SERVICIOS+'/solicitud/'+id;
    url +='?token='+this._usuarioService.token;
    return this._http.get(url);
  }
  //=======================SE COMPLETARON TODOS LOS MANTENIMIENTOS DE LA SOLICITUD?======//
    mttosCompletos(id){
      let url = URL_SERVICIOS+'/mantenimientos/completos/'+id;
      return this._http.get(url).pipe(
        map((resp:any)=>{
          
          return resp;
        })
      )
    }
  //====CONSULTADO LOS MANTENIMIENTOS ENTRE FECHAS======//
  mttosEntreFechas(mantenimiento: MantenimientoModel){
    let url = URL_SERVICIOS+'/mantenimientos/manten/entre/fechas';
    return this._http.post(url, mantenimiento).pipe(
      map((resp:any)=>{
        console.log(resp);
        return resp;
      })
    )
  }
  
  


}        



