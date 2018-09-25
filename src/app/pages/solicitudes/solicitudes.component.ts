import { Component, OnInit } from '@angular/core';
import { SolicitudModel, Atributo } from '../../models/solicitudModel';
import { SolicitudService, ItemService } from '../../services/service.index';
import { FormsModule, FormGroup, Validators, FormBuilder, FormGroupDirective } from '@angular/forms'

import { MedicoModel } from '../../models/medicoModel';
import { Router } from '@angular/router';

declare var swal:any;

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {
  solicitudes : SolicitudModel[]=[];
  solicitud :SolicitudModel;
  item : Atributo;
  
  form: FormGroup;
  formSubmit: boolean;
  estado : string;



  
  constructor(
    public _solicitudServices : SolicitudService,
    public _itemService : ItemService,
    public _router : Router,
    private fb: FormBuilder
  ){ 
    

  }

  ngOnInit() {
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    if(usuario.role === "USER_ROLE"){
      this.cargarSolicitudesCliente();
      console.log("entre al user role");
    }else{
      this.cargarSolicitudes();
    }
    this.form = this.fb.group({
      item: [ null, Validators.required ],
      nombresolicitud: ["", Validators.required ],
      estado: ["", Validators.required ]
      
    });
  }
  //==============================CREAR SOLICITUD======================//
  crearSolicitud(formData: any, formDirective: FormGroupDirective){
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    let cliente = usuario.cliente
    let cargo = usuario.cargo
    
    const formModel  = this.form.value;
    const saveSolicitud: SolicitudModel = {
      nombre: formModel.nombresolicitud as string,
      estado: "CREADA",
      cliente : cliente,
      cargo : cargo,
      valorTotal : 0
    };
        
    this._solicitudServices.crearSolicitud(saveSolicitud)
      .subscribe((saveSolicitud)=> console.log(saveSolicitud));   
      
      if(usuario.role === "USER_ROLE"){
        let cargar = setTimeout(()=>{
          console.log("setTimeout");
          this.cargarSolicitudesCliente();
          console.log("entre al user role");
        },300)

      }else if(usuario.role === "ADMIN_ROLE"){
        let cargar = setTimeout(()=>{
          console.log("setTimeout");
          this.cargarSolicitudes();
          console.log("entre al ADMIN ROLE");
        },300)
        
      }
      formData.reset();
  }
  cargarSolicitudes(){
    this._solicitudServices.cargarSolicitudes()
      .subscribe(solicitudes=>{
        this.solicitudes=solicitudes
        
      })   
  }
  
  cargarSolicitudesCliente(){
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    let cliente = usuario.cliente;
    
    
    this._solicitudServices.cargarSolicitudesCliente(cliente)
      .subscribe(solicitudes=>{
        this.solicitudes=solicitudes
        
      })   
  }
  //=======================ELIMINAR SOLICITUD==================//
  eliminarSolicitud(id){
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    swal({
      title: "Esta seguro?",
      text: "Esta a punto de borrar un item ",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
        this._solicitudServices.eliminarSolicitud(id).subscribe(
          response=>{
            swal("Su solicitud ha sido borrada", {
              icon: "success",
            });
            if(usuario.role === "USER_ROLE"){
              let cargar = setTimeout(()=>{
                console.log("setTimeout");
                this.cargarSolicitudesCliente();
                console.log("entre al user role");
              },10)
      
            }else if(usuario.role === "ADMIN_ROLE"){
              let cargar = setTimeout(()=>{
                console.log("setTimeout");
                this.cargarSolicitudes();
                console.log("entre al ADMIN ROLE");
              },10)
              
            }
          },
          error=>{
            console.log(error);
          }
        )
      } else {
        swal({
          icon:"info",
          text:"ESu solicitud no sera borrada"
        });
      }
    });    
  }
 //=====================MENSAJE DE SOLICITUD CERRADA O ACEPTADA===================//
 mensajeSolicitudCerradaoAceptada(){
  swal('Error ', "Esta solicitud Esta Cerrada o Aceptada", 'error');
 }

  




}
