import { Injectable } from '@angular/core';
import { UsuariosModel } from '../../models/usuarioModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Observable, Subject, pipe } from 'rxjs';
import { map } from "rxjs/operators"; 
import { ViewFlags } from '../../../../node_modules/@angular/core/src/view';
import { Router } from '@angular/router';


@Injectable()
export class UsuarioService {
  usuario : UsuariosModel;
  token : string;

  constructor(public _http: HttpClient, public router: Router,) { 
    console.log("servicio de usuario listo");
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
  logout(){
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');
    this.router.navigate(['/login']);
  }
  actualizarUsuario(usuario: UsuariosModel){
    let url = URL_SERVICIOS+'/usuarios/'+usuario._id;
    return this._http.put(url, usuario)

    return this._http.post(url, usuario).pipe(
      map((resp: any) =>{
        console.log(resp);
        var usuarioDb= resp.usuario
          localStorage.setItem('id', usuarioDb._id);
          localStorage.setItem('token', usuarioDb.token);
          localStorage.setItem('usuario', JSON.stringify(usuarioDb.usuario));
        }));
    
  }
}
