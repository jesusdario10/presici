import { Component, OnInit } from '@angular/core';
import { UsuariosModel } from '../../models/usuarioModel';
import { UsuarioService, ClienteService, CargosService } from '../../services/service.index';
import { URL_SERVICIOS } from '../../config/config';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { ClienteModel } from '../../models/clienteModel';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormGroupDirective, FormControl } from '@angular/forms';
import { CargoModel } from '../../models/cargoModel';

declare var swal:any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios : UsuariosModel[] = [];
  desde : number = 0;
  totalRegistros : number = 0;
  cargando : boolean = true;
  clientes : ClienteModel[]=[];
  cargos : CargoModel[]=[];
  form: FormGroup;;

  constructor(
    public _usuarioService : UsuarioService,
    public _modalUploadService: ModalUploadService,
    public _cliente : ClienteService,
    private _route : ActivatedRoute,
    private fb: FormBuilder,
    private _cargo : CargosService
      
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.listarClientes();
    this.listarCargos();
    this._modalUploadService.notificacion
        .subscribe(resp=>{
          this.cargarUsuarios()
        })

    this.form = new FormGroup({
      nombreC: new FormControl("", Validators.required),
      correoC: new FormControl("", [Validators.required, Validators.email]),
      passwordC : new FormControl("", Validators.required),
     
      roleC : new FormControl("", Validators.required),
      
      cargoC : new FormControl("", Validators.required),
      clienteC : new FormControl("", Validators.required)
      
    });
    //usuario para no estar llenando campos  
  }
  cargarUsuarios(){
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde)
      .subscribe((resp:any)=>{
        console.log(resp);
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;
        this.cargando = false;
      }); 
  }
  cambiarDesde(valor:number){
    let desde = this.desde + valor;
    console.log(desde);
    if(desde>=this.totalRegistros){
      return
    }
    if(desde<0){
      return
    }
    this.desde += valor
    this.cargarUsuarios();
  }
  buscarUsuario(termino:string){
    if(termino.length<=0){
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    console.log(termino);
    let url = URL_SERVICIOS+'/busqueda/usuarios/'+termino;
    this._usuarioService.buscarUsuarios(termino)
        .subscribe((usuarios:any)=>{
          this.usuarios = usuarios;
          this.cargando = false;
        });
  }
  borrarUsuario(usuario:UsuariosModel){
    console.log(usuario);
    if(usuario._id === this._usuarioService.usuario._id){
      swal("No puede borrar usuario", "no se puede borrar asi mismo", "error");
      return;
    }
    swal({
      title: "Esta seguro?",
      text: "OncEsta a punto de borrar a "+usuario.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
        this._usuarioService.borrarUsuario(usuario._id)
          .subscribe((usuarios:any)=>{
            swal("El usuario ha sido borrado", {
              icon: "success",
            });
          });

      } else {
        swal("El usuario no sera borado");
      }
    });
  }
  guardrUsuario(usuario: UsuariosModel){
    this._usuarioService.actualizarUsuario(usuario)
        .subscribe();
  }
  mostrarModal(id:string){
    this._modalUploadService.mostrarModal('usuarios', id);
  }

  listarClientes(){
    this._cliente.listarClientes()
      .subscribe((datos:any)=>{
        this.clientes = datos.clientes
        console.log(datos);
      })
  }
  listarCargos(){
    this._cargo.listarCargos()
      .subscribe((datos:any)=>{
        console.log(datos);
        this.cargos = datos.cargos
      })
  }
  registrarUsuario(){
    console.log("asdasd");
    console.log(this.form.valid);
    /*if(this.form.invalid){
      return;
    }*/
    const formModel  = this.form.value;
    let saveUsuario: UsuariosModel = {
      
        nombre :formModel.nombreC as string,
        correo :formModel.correoC as string,
        password :formModel.passwordC as string,
        
        role :formModel.roleC as string,
        google :formModel.googleC as string,
        cargo :formModel.cargoC as string,
        cliente :formModel.clienteC as string
        
    };
    console.log(saveUsuario);
    
    this._usuarioService.crearUsuario(saveUsuario)
      .subscribe(resp =>{
        
        swal('Usuario Creado', "Correctamente", 'success');
        let intervalo = setTimeout(() => {
          this.cargarUsuarios();
        }, 200);
       

      });
  }
  mirarselect(id){
    console.log(id);
  }
}
