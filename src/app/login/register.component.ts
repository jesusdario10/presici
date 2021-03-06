import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import swal from 'sweetalert'; 
import { UsuarioService } from '../services/service.index';
import { UsuariosModel } from '../models/usuarioModel';
declare function init_plugin();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {
  forma : FormGroup;
  router: any;
  //sep comentario para guardar

  constructor(
    public _usuarioService : UsuarioService,
    public _router :Router
  ) { }

  sonIguales(campo1:string, campo2:string){
    return (group: FormGroup)=>{
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if( pass1 === pass2){
        return null;
      }
      return{
        sonIguales:true
      };
    };
  };

  ngOnInit() {
    init_plugin();
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password : new FormControl(null, Validators.required),
      password2 : new FormControl(null, Validators.required),
      condiciones : new FormControl(false)
    }, {validators: this.sonIguales('password', 'password2')});
    //usuario para no estar llenando campos
    this.forma.setValue({
      nombre : 'test',
      correo:'test1@test.com.co',
      password:'123',
      password2:'123',
      condiciones:true

    })
  }
  registrarUsuario(){

    if(this.forma.invalid){
      return;
    }
    if(!this.forma.value.condiciones){
      swal('Importante', 'Debe de aceptar las condiciones', 'warning');
      return;
    }
    let usuario = new UsuariosModel(this.forma.value.nombre, this.forma.value.correo, this.forma.value.password);
    
    this._usuarioService.crearUsuario(usuario)
      .subscribe(resp =>{
        
        swal('Usuario Creado', "Correctamente", 'success');
       this._router.navigate(['/login']);

      });
  }

}

