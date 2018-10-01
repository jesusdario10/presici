import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, pipe } from 'rxjs';
import { URL_SERVICIOS } from '../../config/config';
import { SolicitudModel } from '../../models/solicitudModel';
import { map, catchError } from "rxjs/operators"; 
import { throwError } from "rxjs/internal/observable/throwError"; 
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
          }),
          catchError(err=>{
            
            swal('Error ', err.error.mensaje, 'error');
            return throwError(err) //nos retornra u observable
          })
        );
       }
       
        // =====================Cargar Solicitudes Administrador ==================================//
        cargarSolicitudes():Observable<any>{
          let url = URL_SERVICIOS+'/solicitud';
          url +='?token='+this._usuarioService.token;
          return this._http.get(url).pipe(
            map((resp:any)=>{
              return resp.solicitudes
            }),
            catchError(err=>{
              console.log("se va a un error?");
              this._usuarioService.logout();
              
              swal('Error ', err.error.mensaje, 'error');
              
              return throwError(err) //nos retornra u observable
              
            })
          )
        }
      // =====================Cargar Solicitudes ==================================//
       cargarSolicitudesCliente(cliente):Observable<any>{
        let url = URL_SERVICIOS+'/solicitud/solicitudesclientes/'+cliente;
        url +='?token='+this._usuarioService.token;
        return this._http.get(url).pipe(
          map((resp:any)=>{
            return resp.solicitudes
          }),
          catchError(err=>{
            swal('Error ', err.error.mensaje, 'error');
            this._usuarioService.logout();
            return throwError(err) //nos retornra u observable
          })
        )
      }
      // =====================buscar todas las solicitudes en vista solicitudes ==================================//
          cargarSolicitudes2():Observable<any>{
            let url = URL_SERVICIOS+'/solicitud';
            url +='?token='+this._usuarioService.token;
              return this._http.get(url).pipe(
                map((resp:any)=>{
                  return resp.solicitudes
                }),
                catchError(err=>{              
                  swal('Error ', err.error.mensaje, 'error');
                  return throwError(err) //nos retornra u observable
                })
              )
          }
      // =====================buscar todas las solicitudes CREADAS ==================================//
      cargarSolicitudesCreadasOCerradas():Observable<any>{
        let url = URL_SERVICIOS+'/solicitud/creadasoCerradas/solicitudes';
        url +='?token='+this._usuarioService.token;
          return this._http.get(url).pipe(
            map((resp:any)=>{
              return resp.solicitudes
            }),
            catchError(err=>{              
              swal('Error ', err.error.mensaje, 'error');
              return throwError(err) //nos retornra u observable
            })
          )
      }
      // =====================buscar todas las solicitudes ACEPTADAS ==================================//
      cargarSolicitudesAceptadas():Observable<any>{
        let url = URL_SERVICIOS+'/solicitud/aceptadas/solicitudes';
        url +='?token='+this._usuarioService.token;
          return this._http.get(url).pipe(
            map((resp:any)=>{
              return resp.solicitudes
            }),
            catchError(err=>{              
              swal('Error ', err.error.mensaje, 'error');
              return throwError(err) //nos retornra u observable
            })
          )
      }        
          
      // =====================buscar solicitud por id ==================================//
        cargarSolicitud(id):Observable<any>{
          let url = URL_SERVICIOS+'/solicitud/'+id
            return this._http.get(url).pipe(
              map((resp:any)=>{
                return resp.solicitudes
              })

            )
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
        return resp;  
      }),
      catchError(err=>{
       console.log(err);
       
        swal('Error ', err.error.mensaje, 'error');
        return throwError(err) //nos retornra u observable
      })
      
    );    
  }
  // ===========eliminar items o valvulas de la solicitud ============================= //
    eliminarSolicitud(id){
    let url = URL_SERVICIOS+'/solicitud/'+id;
    url +='?token='+this._usuarioService.token
    return this._http.delete(url);
  }

    
  
}
