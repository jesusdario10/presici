import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, pipe } from 'rxjs';
import { URL_SERVICIOS } from '../../config/config';
import { map } from "rxjs/operators"; 
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ItemModel } from '../../models/itemModel';
import { SolicitudModel } from '../../models/solicitudModel';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class ItemService {
  idSolicitud :string;
  idItem :string;
  valor_total :number;
  idCliente : string;
  

  constructor(
    private _http : HttpClient,
    private _route: ActivatedRoute,
    private _usuarioService : UsuarioService

  ) {
   }
      // =====================Crear solicitud ==================================//
      CrearSolicitud(solicitud:SolicitudModel, id):Observable<any>{
        let url = URL_SERVICIOS+'/item/'+this.idSolicitud;
        url +='?token='+this._usuarioService.token
        return this._http.post(url, solicitud).pipe(
          map((resp:any)=>{
            console.log(resp);
             
             console.log(resp); 
             return resp.itemGuardado
             
          })
        );
       }
          // =====================Cargar todo el item de la db ==================================//
          listarItemssolicitudes():Observable<any>{
            let url = URL_SERVICIOS+'/solicitud/'+this.idSolicitud;
            url +='?token='+this._usuarioService.token;
            
            return this._http.get(url);
          }
        //===obtener el id de la solicitud que viene por la url==//
        obtenerSolicitud(){
          let urlActual = window.location.href;
          let extraer = urlActual.split('/');
          let solicitud = extraer[5];
          this.idSolicitud = solicitud;
          
        }
        // =====================Cargar sun solo item ==================================//
        cargItem():Observable<any>{
          let url = URL_SERVICIOS+'/item/'+this.idSolicitud+'/'+this.idItem;
          url +='?token='+this._usuarioService.token;
          
          return this._http.get(url);
        }
    // =====================insertar ==================================//
    AgregarItem(solicitud:SolicitudModel, idCliente){
      let url = URL_SERVICIOS+'/solicitud/'+this.idSolicitud+'/'+idCliente;
      url +='?token='+this._usuarioService.token;
      
      
      return this._http.post(url, solicitud).pipe(
        map((resp:any)=>{
         swal('Creado', 'Item Creado Correctamente', 'success');
         return resp.solicitud;
         
        })  
      );
      
    }
    //================Eliminar Item =================================== //
    EliminarItem(index){
      let url = URL_SERVICIOS+'/gestionitem/'+this.idSolicitud+'?item='+index;
      url +='?token='+this._usuarioService.token
      return this._http.delete(url);
    }
        



       

             
  
}
