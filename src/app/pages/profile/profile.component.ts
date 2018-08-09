import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { UsuariosModel } from '../../models/usuarioModel';
import swal from 'sweetalert'; 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  public usuario : UsuariosModel

  constructor(
    public _usuarioService : UsuarioService
  ) {
    this.usuario = this._usuarioService.usuario;
   }
  ngOnInit(){}
  guardar(usuario:UsuariosModel){
    this.usuario.nombre = usuario.nombre;
    this.usuario.correo = usuario.correo;

    console.log(this.usuario);
    this._usuarioService.actualizarUsuario(this.usuario)
              .subscribe(resp =>{
                console.log(resp);
                swal('Actualizado', 'Datos Actualizados Correctamente', 'success');
              })

  }

  
}
