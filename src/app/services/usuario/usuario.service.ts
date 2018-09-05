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
  menu : any[]=[];


  constructor(public _http: HttpClient,
              public router: Router,
              public _subirArchivoService: SubirArchivoService) { 

              this.cargarStorage();
              
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
      this.menu = JSON.parse(localStorage.getItem('menu'));
    }else{
      this.token = '',
      this.usuario = null;
      this.menu = null;
    }
  }
  guardarStoage(id :string, token: string, usuario:UsuariosModel, menu : any){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    //localStorage.setItem('menu', JSON.stringify(menu));

    //this.menu = menu; // lo almacemo como me viene sin pasarlo por el stringify

  }
  estaLogeado(){
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
        localStorage.setItem('menu', JSON.stringify(resp.menu));
        this.menu = JSON.parse(localStorage.getItem('menu')); 
        //return resp.usuario;
        this.guardarStoage(resp.usuario._id, resp.token, resp.usuario, resp.menu)
          /*localStorage.setItem('id', resp.usuario._id);
          localStorage.setItem('token', resp.token);
          localStorage.setItem('usuario', JSON.stringify(resp.usuario));
          localStorage.setItem('menu', JSON.stringify(resp.menu));*/
          
        }));
       
  }
  // =======================Logout=========================================== //
  logout(){
    this.usuario = null;
    this.token = '';
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');
    localStorage.removeItem('cliente');
    localStorage.removeItem('cargo');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
    
  }
  // =======================Actualziar Datos de usuario======================= //
  actualizarUsuario(usuario: UsuariosModel):Observable<any>{
    let url = URL_SERVICIOS+'/usuarios/'+usuario._id;
    url +='?token='+this.token;
    return this._http.put(url, usuario).pipe(
      map((resp: any) =>{
        if(usuario._id===this.usuario._id){
          console.log("voy por aqui");
          let usuarioDB : UsuariosModel = resp.usuario
          this.guardarStoage(usuarioDB._id, this.token, usuarioDB, this.menu)
        }
       
        swal('Actualizado', 'Datos Actualizados Correctamente', 'success');       
      }));    
  }
  // =====================Subir Archivos de usuarios ==================================//
  cambiarImagen(archivo: File, id: string){
    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
        .then((resp:any)=>{
          this.usuario.img = resp.usuario.img;
          swal('Imagen actualizada', this.usuario.nombre, 'success');
          this.guardarStoage(id, this.token, this.usuario, this.menu);
        })
        .catch(resp=>{
          console.log(resp);
        });
  } 
  // =====================Cargar Usuarios ==================================//
  cargarUsuarios(desde: number = 0){
    let url = URL_SERVICIOS+'/usuarios?desde='+desde;
    return this._http.get(url);
  }
  // =====================Buscar Usuarios ==================================//
  buscarUsuarios(termino: string):Observable<any>{
    let url = URL_SERVICIOS+'/busqueda/usuarios/'+termino;
    return this._http.get(url).pipe(
      map((resp:any)=>{
       return resp.usuarios;
      })
    );
  }
   // =====================Borrar Usuarios ==================================//
   borrarUsuario(id:string):Observable<any>{
    let url = URL_SERVICIOS+'/usuarios/'+id;

    return this._http.delete(url).pipe(
      map((resp:any)=>{
       return resp.usuarios;
      })
    );
   }
}
