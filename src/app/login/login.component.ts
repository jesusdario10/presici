import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuariosModel } from '../models/usuarioModel';
import { UsuarioService } from '../services/service.index';

declare function init_plugin();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public recuerdame : boolean = false;
  public email :string;
  public usuario : UsuariosModel;
  token ='';


  constructor(
    public router: Router,
    public _usuarioService: UsuarioService
  ) { }
  ngOnInit() {
    init_plugin();
    this.email = localStorage.getItem('email') || '';
    if(this.email.length>1){
      this.recuerdame = true;
    }
  }
  ingresar(forma: NgForm){
    if(forma.invalid){
      return;
    }
    let usuario = new UsuariosModel(null, forma.value.correo, forma.value.password);
    this._usuarioService.login(usuario, forma.value.recuerdame)
        .subscribe(correcto=>{   
          this._usuarioService.cargarStorage();
          this.router.navigate(['/dashboard']);
        });
  }
}
