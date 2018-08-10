import { Injectable } from '@angular/core';
import { UsuariosModel } from '../../models/usuarioModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Observable, Subject, pipe } from 'rxjs';
import { map } from "rxjs/operators"; 
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';



@Injectable()
export class UsuarioService {
  usuario : UsuariosModel;
  token : string;

  constructor(public _http: HttpClient,
              public router: Router,
              public _subirArchivoService: SubirArchivoService) { 

              this.cargarStorage();
              console.log(this.cargarStorage());
  }
  crearUsuario(usuario:UsuariosModel):Observable<any>{
    let url = URL_SERVICIOS+'/usuarios';
    let params = JSON.stringify(usuario);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    
    return this._http.post(url, params, {headers:headers});
  }
  cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.token = '',
      this.usuario = null;
    }
  }
  guardarStoage(id :string, token: string, usuario:UsuariosModel){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }
  estaLogeado(){
    console.log(this.token.length);
    return (this.token.length > 5) ? true : false;
  }
  // =======================Login=========================================== //
  login(usuario: UsuariosModel, recordar:boolean=false):Observable<any>{
    if(recordar){
      localStorage.setItem('email', usuario.correo);
    }else{
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS+'/login';
    let params = JSON.stringify(usuario);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(url, params, {headers:headers}).pipe(
      map((resp: any) =>{
        console.log(resp);
        //return resp.usuario;
          localStorage.setItem('id', resp.usuario._id);
          localStorage.setItem('token', resp.token);
          localStorage.setItem('usuario', JSON.stringify(resp.usuario));
        }));
        //this.cargarStorage();
  }
  // =======================Logout=========================================== //
  logout(){
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');
    this.router.navigate(['/login']);
  }
  // =======================Actualziar Datos de usuario======================= //
  actualizarUsuario(usuario: UsuariosModel):Observable<any>{
    let url = URL_SERVICIOS+'/usuarios/'+usuario._id;
    console.log("paso1");
    return this._http.put(url, usuario).pipe(
      map((resp: any) =>{
        console.log("voy por aqui");
        let usuarioDB : UsuariosModel = resp.usuario
        this.guardarStoage(usuarioDB._id, this.token, usuarioDB)
        swal('Actualizado', 'Datos Actualizados Correctamente', 'success');       
      }));    
  }
  // =====================Subir Archivos de usuarios ==================================//
  cambiarImagen(archivo: File, id: string){
    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
        .then((resp:any)=>{
          this.usuario.img = resp.usuario.img;
          swal('Imagen actualizada', this.usuario.nombre, 'success');
          this.guardarStoage(id, this.token, this.usuario);
        })
        .catch(resp=>{
          console.log(resp);
        });
  } 
}
