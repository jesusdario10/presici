import { Component, OnInit } from '@angular/core';
import { UsuariosModel } from '../../models/usuarioModel';
import { UsuarioService } from '../../services/service.index';
import { URL_SERVICIOS } from '../../config/config';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

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

  constructor(
    public _usuarioService : UsuarioService,
    public _modalUploadService: ModalUploadService
      
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion
        .subscribe(resp=>{
          this.cargarUsuarios()
        })
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
}
