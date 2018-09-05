import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { UsuariosModel } from '../../models/usuarioModel';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  public usuario : UsuariosModel;
  public imagenSubir :File

  constructor(
    public _usuarioService : UsuarioService
   
  ) {
    this.usuario = this._usuarioService.usuario;
   }
  ngOnInit(){
    
  }
  guardar(usuario:UsuariosModel){
    this.usuario.nombre = usuario.nombre;
    this.usuario.correo = usuario.correo;

    
    this._usuarioService.actualizarUsuario(this.usuario)
              .subscribe(); 
  }
  seleccionImagen(archivo){
    this.imagenSubir= null;
    if(!archivo){
      return
    }
    //este if es para comprobar si el archivo es una imagen
    if(archivo.type.indexOf('image')<0){
      swal('Solo imagenes', 'El archivo selecconado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
      
    }
    //si si viene archivo
    this.imagenSubir = archivo
  }
  cambiarImagen(){
    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }
    
    

}
