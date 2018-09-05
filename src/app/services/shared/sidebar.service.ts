import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu : any[]=[];
 
  constructor(
    private _usuarioService : UsuarioService
  ) {}
   //esta funcion la llamare en el oninit de del sidebarCompnent.ts para cargar el menu
   cargarmenu(){
    this.menu = this._usuarioService.menu;
   }

}
