import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, pipe } from 'rxjs';
import { URL_SERVICIOS } from '../../config/config';
import { TareaModel } from '../../models/tareaModel';
import { map } from "rxjs/operators"; 
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class TareaService {
  public tarea: TareaModel;

  constructor(
    private _http : HttpClient,
    private _usuarioService : UsuarioService
  ) { }

  // =====================Crear Tarea ==================================//
    crearTarea(tarea:TareaModel):Observable<any>{
      let url = URL_SERVICIOS+'/tarea';
      url +='?token='+this._usuarioService.token;
      return this._http.post(url, tarea).pipe(
        map((resp:any)=>{
          console.log(resp);
           swal('Creada', 'Tarea  Creada  Correctamente', 'success');
           return resp.tarea;
        })
      );
     }
  //=====================Listar| Tareas ==================================//
     listarTareas():Observable<any>{
      let url = URL_SERVICIOS+'/tarea'
      url +='?token='+this._usuarioService.token;
      return this._http.get(url).pipe(
        map((resp:any)=>{
          console.log("cargando las tareas existentes");
          console.log(resp);
          return resp.tareas
        })
      )
    }    
}
