import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, pipe } from 'rxjs';
import { URL_SERVICIOS } from '../../config/config';
import { SolicitudModel } from '../../models/solicitudModel';
import { map } from "rxjs/operators"; 
import { Router } from '@angular/router';
import { UsuarioService } from '../service.index';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor(
    private _http : HttpClient,
    private _usuarioService : UsuarioService
  ) {
   }
      // =====================Crear solicitud ==================================//
      crearSolicitud(solicitud:SolicitudModel):Observable<any>{
        let url = URL_SERVICIOS+'/solicitud';
        let params = JSON.stringify(solicitud);
        return this._http.post(url, solicitud).pipe(
          map((resp:any)=>{
            console.log(resp);
             swal('Creada', 'Solicitud Creada Correctamente', 'success');  
             return resp.solicitudGuardada;
          })
        );
       }
       
        // =====================Cargar Solicitudes ==================================//
        cargarSolicitudes():Observable<any>{
          let url = URL_SERVICIOS+'/solicitud'
          return this._http.get(url).pipe(
            map((resp:any)=>{
              return resp.solicitudes
            })
          )
        }
    // =====================Actualziar Solicitudes ==================================//
    actualizarSolicitud(solicitud:SolicitudModel){
      let url = URL_SERVICIOS+'/solicitud/'+solicitud._id;
      return this._http.put(url, solicitud).pipe(
        map((resp:any)=>{
        swal('Actualizado', 'Solicitud Actualzida Correctamente', 'success');  
         return resp.solicitd;
        })
      );
    } 
             
  
}
