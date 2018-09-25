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
export class OrdenesService {
  idSolicitud : string;

  constructor(
    private _http : HttpClient,
    private _usuarioService : UsuarioService,
  ){

  }
  //===obtener el id de la solicitud que viene por la url==//
  obtenerSolicitud(){
    let urlActual = window.location.href;
    let extraer = urlActual.split('/');
    let solicitud = extraer[5];
    this.idSolicitud = solicitud;
  }

  enviandosolicitud(solicitud:SolicitudModel, id):Observable<any>{
    let url = URL_SERVICIOS+'/mantenimientos/'+id;
    
    return this._http.post(url, solicitud).pipe(
      map((resp:any)=>{
 
      })

    );
  }

 //==================LISTANDO LOS MANTENIMIENTOS==========================//

  listarMantenimientos(id):Observable<any>{
    let url = URL_SERVICIOS+'/mantenimientos/'+id;
    return this._http.get(url).pipe(
      map((resp:any)=>{
        return resp;
      })
    )
  }


}
