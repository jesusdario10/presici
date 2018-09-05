import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, pipe } from 'rxjs';
import { URL_SERVICIOS } from '../../config/config';
import { TipomttoModel } from '../../models/tipomtto';
import { map } from "rxjs/operators"; 
import { Router } from '@angular/router';
import { UsuarioService, ItemService } from '../service.index';

@Injectable({
  providedIn: 'root'
})
export class TipomttoService {
  tipomtto : TipomttoModel;
  constructor(
    private _http : HttpClient,
    private _usuarioService : UsuarioService
  ) { }

  // =====================Crear tipo mtto ==================================//
        crearTipoMtto(tipomtto:TipomttoModel):Observable<any>{
          let url = URL_SERVICIOS+'/tipomtto';
          url +='?token='+this._usuarioService.token;
          return this._http.post(url, tipomtto).pipe(
            map((resp:any)=>{
              console.log(resp);
               swal('Creada', 'Tipo Mtto Creado  Correctamente', 'success');
               return resp.tipoMtto;
            })
          );
         }
        //=====================Cargar tipos mtto ==================================//
        cargarTipoMtto():Observable<any>{
          let url = URL_SERVICIOS+'/tipomtto'
          return this._http.get(url).pipe(
            map((resp:any)=>{
              console.log("cargando los tipos de mantenimiento");
              console.log(resp);
              return resp.tiposMtto
            })
          )
        }     
         
}
