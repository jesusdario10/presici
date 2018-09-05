import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../services/service.index';
import { UsuariosModel } from '../../models/usuarioModel';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public usuario : UsuariosModel;
  public elmenu : any[]=[];
  public elotro : any;

  constructor(
     public _sidebar:SidebarService,
     public _usuarioService : UsuarioService
    ) { 
      this.elmenu = this._sidebar.menu;
    }

  ngOnInit() {
  //cargando el menu
   this._sidebar.cargarmenu();
  // 
   this.usuario = this._usuarioService.usuario;
  }
  logout(){
    this._usuarioService.logout();
  }

}
