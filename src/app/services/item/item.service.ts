import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, pipe } from 'rxjs';
import { URL_SERVICIOS } from '../../config/config';
import { map } from "rxjs/operators"; 
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ItemModel } from '../../models/itemModel';


@Injectable({
  providedIn: 'root'
})
export class ItemService {
  idSolicitud :string

  constructor(
    private _http : HttpClient,
    private _route: ActivatedRoute

  ) {
   }
      // =====================Crear solicitud ==================================//
      crearItem(item:ItemModel):Observable<any>{
        let url = URL_SERVICIOS+'/item/'+this.idSolicitud;
        return this._http.post(url, item).pipe(
          map((resp:any)=>{
            console.log(resp);
             
             console.log(resp); 
             return resp.itemGuardado
             
          })
        );
       }
        // =====================Cargar Items ==================================//
        cargarItems():Observable<any>{
          let url = URL_SERVICIOS+'/item/'+this.idSolicitud;
          return this._http.get(url).pipe(
            map((resp:any)=>{
              return resp.items
            })
          )
        }
        //===obtener el id de la solicitud que viene por la url==//
        obtenerSolicitud(){
          let urlActual = window.location.href
          let extraer = urlActual.split('/');
          let solicitud = extraer[5]
          this.idSolicitud = solicitud;
        }

       

             
  
}
