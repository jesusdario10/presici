import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, pipe } from 'rxjs';
import { URL_SERVICIOS } from '../../config/config';
import { SolicitudModel } from '../../models/solicitudModel';
import { map } from "rxjs/operators"; 
import { Router } from '@angular/router';
import { UsuarioService, ItemService } from '../service.index';


@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  solicitud : SolicitudModel;
  lt :string;

  constructor(
    private _http : HttpClient,
    private _usuarioService : UsuarioService,
    
  ) {
   }
      // =====================Crear solicitud ==================================//
      crearSolicitud(solicitud:SolicitudModel):Observable<any>{
        let url = URL_SERVICIOS+'/solicitud';
        url +='?token='+this._usuarioService.token

        return this._http.post(url, solicitud).pipe(
          map((resp:any)=>{
            
             swal('Creada', 'Solicitud Creada Correctamente', 'success');  
             localStorage.setItem('solicitud', resp.solicitudGuardada._id)
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
      // =====================Cargar Solicitudes ==================================//
       cargarSolicitudesCliente(cliente):Observable<any>{
        let url = URL_SERVICIOS+'/solicitud/solicitudesclientes/'+cliente
        return this._http.get(url).pipe(
          map((resp:any)=>{
            return resp.solicitudes
          })
        )
      }
      // =====================buscar todas las solicitudes ==================================//
          cargarSolicitudes2():Observable<any>{
            let url = URL_SERVICIOS+'/solicitud'
              return this._http.get(url);
          }
          
      // =====================buscar solicitud por id ==================================//
        cargarSolicitud(id):Observable<any>{
          let url = URL_SERVICIOS+'/solicitud/'+id
            return this._http.get(url);
        }
        
    // =====================Actualizar Solicitudes ==================================//

      actualizarSolicitud(id, solicitud:SolicitudModel):Observable<any>{
      let url = URL_SERVICIOS+'/solicitud/'+id
      url +='?token='+this._usuarioService.token
      console.log("paso1");
      return this._http.put(url, solicitud).pipe(
        map((resp: any) =>{
          console.log("voy por aqui");
          let SolicitudDb : SolicitudModel = resp.solicitud
        swal('Actualizado', 'Datos Actualizados Correctamente', 'success');       
      }));    
  }
  // ===========eliminar items o valvulas de la solicitud ============================= //
    eliminarSolicitud(id){
    let url = URL_SERVICIOS+'/solicitud/'+id;
    return this._http.delete(url);
  }

    
  
}
