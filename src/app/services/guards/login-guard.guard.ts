import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../service.index';


@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(
    public _usuarioService : UsuarioService,
    public router : Router
   
  ){
    console.log("servicio de guard listo");
  }
  canActivate(){
    if(this._usuarioService.estaLogeado()){
      console.log("paso el guard");
      return true;
    }else{
      console.log("bloqueado por el guard");
      this.router.navigate(['/login']);
      return false;
    }
  }
}
