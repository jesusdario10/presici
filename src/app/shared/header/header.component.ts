import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { UsuariosModel } from '../../models/usuarioModel';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  public img :string;
  public usuario : UsuariosModel

  constructor(
    public _usuarioService : UsuarioService
  ) { 
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }
  logout(){
    this._usuarioService.logout();
  }

}
