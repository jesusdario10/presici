import { Injectable } from '@angular/core';
import { UsuariosModel } from '../../models/usuarioModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Observable, Subject, pipe } from 'rxjs';
import { map } from "rxjs/operators"; 
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { UsuarioService } from '../usuario/usuario.service';
import { HospitalModel } from '../../models/hospitalModel';
import { MedicoModel } from '../../models/medicoModel';

@Injectable()
export class MedicoService {
  totalMedicos: number = 0;

  constructor(
    public _http : HttpClient,
    public _router : Router,
    public _usuarioService : UsuarioService

  ) { }
    // =====================Cargar Hospitales ==================================//
    cargarMedicos(desde: number = 0){
      let url = URL_SERVICIOS+'/medico?desde='+desde;
      return this._http.get(url).pipe(
        map((resp:any)=>{
          this.totalMedicos = resp.total;
          return resp.medicos
        })
      )
    }
        // =====================Buscar medico ==================================//
        buscarMedico(termino: string):Observable<any>{
          let url = URL_SERVICIOS+'/busqueda/medicos/'+termino;
          return this._http.get(url).pipe(
            map((resp:any)=>{
             return resp.medicos;
            })
          );
        }
    // =====================Borrar Medico ==================================//
    borrarMedico(id:string):Observable<any>{
      let url = URL_SERVICIOS+'/medico/'+id;
      url+='?token='+this._usuarioService.token;
  
      return this._http.delete(url).pipe(
        map((resp:any)=>{
          console.log(resp);
           swal('Eliminado', 'Dato borrado Correctamente', 'success');  
           resp.hospitales;
        })
      );
     }
      // =====================Crear hospital ==================================//
      crearMedico(medico:MedicoModel):Observable<any>{
        let url = URL_SERVICIOS+'/medico';
        url+='?token='+this._usuarioService.token;
    
        return this._http.post(url, medico).pipe(
          map((resp:any)=>{
            console.log(resp);
             swal('Creado', 'Medico Creado Correctamente', 'success');  
             resp.medicoGuardado;
          })
        );
       }       

}
