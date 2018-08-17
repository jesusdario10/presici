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
  idSolicitud :string;
  idItem :string;
  valor_total :number;

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
        // =====================Cargar solo los campos a insertar en la db ==================================//
        cargarItems():Observable<any>{
          let url = URL_SERVICIOS+'/item/'+this.idSolicitud;
          return this._http.get(url).pipe(
            map((resp:any)=>{
              this.valor_total = resp.items.valorTotal
              return resp.items
            })
          )
        }
          // =====================Cargar todo el item de la db ==================================//
          cargarItems2():Observable<any>{
            let url = URL_SERVICIOS+'/item/'+this.idSolicitud;
            return this._http.get(url);
          }
        //===obtener el id de la solicitud que viene por la url==//
        obtenerSolicitud(){
          let urlActual = window.location.href
          let extraer = urlActual.split('/');
          let solicitud = extraer[5];
          let itemid =extraer[6];
          this.idItem =itemid;
          console.log("clave del item"); 
          console.log(this.idItem);
          this.idSolicitud = solicitud;
        }
        //borrar proyectos
          deleteItem(id){
            let url = URL_SERVICIOS+'/item/'+this.idSolicitud+'/'+id;
        
            return this._http.delete(url);
        }
        // =====================Cargar sun solo item ==================================//
        cargItem():Observable<any>{
          let url = URL_SERVICIOS+'/item/'+this.idSolicitud+'/'+this.idItem;
          console.log(url);
          return this._http.get(url);
        }
        



       

             
  
}
