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

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  totalHospitales: number = 0;


  constructor(public _http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService,
    public _usuarioService : UsuarioService) { 
}
    
  // =====================Cargar Hospitales ==================================//
        cargarHospitales(desde: number = 0){
          let url = URL_SERVICIOS+'/hospitales?desde='+desde;
          return this._http.get(url).pipe(
            map((resp:any)=>{
              this.totalHospitales = resp.total;
              return resp.hospitales
            })
          )
        }
   // =====================Borrar Horpital ==================================//
   borrarHospital(id:string):Observable<any>{
    let url = URL_SERVICIOS+'/hospitales/'+id;
    url+='?token='+this._usuarioService.token;

    return this._http.delete(url).pipe(
      map((resp:any)=>{
        console.log(resp);
         swal('Eliminado', 'Datos borrado Correctamente', 'success');  
         resp.hospitales;
      })
    );
   }
   // =====================Crear hospital ==================================//
   crearHospital(nombre:string):Observable<any>{
    let url = URL_SERVICIOS+'/hospitales';
    url+='?token='+this._usuarioService.token;

    return this._http.post(url, {nombre}).pipe(
      map((resp:any)=>{
        console.log(resp);
         swal('Creado', 'Hospital Creado Correctamente', 'success');  
         resp.hospitalesGuardado;
      })
    );
   }
    // =====================Buscar hospital ==================================//
    buscarHospital(termino: string):Observable<any>{
      let url = URL_SERVICIOS+'/busqueda/hospitales/'+termino;
      return this._http.get(url).pipe(
        map((resp:any)=>{
         return resp.hospitales;
        })
      );
    }
    // =====================Actualziar hospital ==================================//
    actualizarHospital(hospital:HospitalModel){
      let url = URL_SERVICIOS+'/hospitales/'+hospital._id;
      url+='?token='+this._usuarioService.token;
      return this._http.put(url, hospital).pipe(
        map((resp:any)=>{
        swal('Actualizado', 'Hospital Actualziado Correctamente', 'success');  
         return resp.hospitales;
        })
      );
    }
    
}
