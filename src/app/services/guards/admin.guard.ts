import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    public _usuarioService: UsuarioService,
   
  ){}
  canActivate(){
    //si es admin todo bien
    if(this._usuarioService.usuario.role ==="ADMIN_ROLE"){
      return true
    }else{
      // sino te saco de la sesion
      this._usuarioService.logout();
      return false;
    }
    
  }
}
