import { Component, OnInit } from '@angular/core';
import { ItemService, ClienteService, ValvulasService, SolicitudService } from '../../services/service.index';
import { URL_SERVICIOS } from '../../config/config';
import { ItemModel } from '../../models/itemModel';
import { SolicitudModel, Atributo, Tarea } from '../../models/solicitudModel';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { forEach } from '@angular/router/src/utils/collection';
import { ClienteModel } from '../../models/clienteModel';
import { ValvulaModel} from '../../models/ValvulaModel';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { stringify } from '@angular/core/src/render3/util';



declare var swal:any;


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  /*MANIPULACION DE LOS DATOS*/  
  items : ItemModel[]=[];
  item : ItemModel;
  actividades : any[]=[];
  solicitudDatosCompletos : SolicitudModel;
  cerrada : string ;
  usuarioROLE : string;
 
  cantidad : number;
  datosTotalValor : number;
  

  /*COTIZACION*/ 
  nombreCliente : any;
  nitCliente : any;
  direccionCliente :any;
  telefonoCliente: any;
  HH: number;
  subtotal: number;
  iva:number;
  
  
  /*FORMULARIOS*/
  form: FormGroup;
  formSubmit: boolean;
  idCliente : any;
  tiposValvula : any;

  /*PROPIEDADES PARA INCRUSTAR TAREAS*/
  tvalvula : string;
  tmantenimiento : string;
  tareas : any[]=[];
  //=========IMPRESION================//
  idSolicitud:any;


  constructor(
    private _itemService:ItemService,
    private _solicitudServices: SolicitudService,
    private _cliente : ClienteService,
    private _ValvulasService : ValvulasService,
    private _route : ActivatedRoute,
    private fb: FormBuilder
  ) { 
    
    
  }


  ngOnInit() {
    //carga el role del usuario desde el storage
    this.cargarRoleStorage();
    //obtiene el id de la solicitud desde el servicio
    this._itemService.obtenerSolicitud();
    //me lista la solicitud completa
    this.listarSolicitudCompleta();
    //ejecuto el cargar tipos de valvulas para llevar el select
    this.listarTiposdeValvulas();
    
    this.form = this.fb.group({
      tipovalvula: [ "", Validators.required ],
      tiposello: [ "", Validators.required ],
      diametro: [ "", Validators.required ],
      rating: [ "", Validators.required ],
      material: [ "", Validators.required ],
      otrosdatos: [ "", Validators.required ],
      tipomtto: [ "", Validators.required ],
      prioridad: [ "", Validators.required ],
      dificultad: [ "", Validators.required ],
      sitio: [ "", Validators.required ],
      cantidad: [ 0, Validators.required ],
      fechareq :["", Validators.required]
    });
  }
  //======================LISTAR SOLICITUD COMPLETA===============================//
  listarSolicitudCompleta(){ 
    this._itemService.listarItemssolicitudes()
      .subscribe((datos)=>{
        console.log(datos);
        
        //los datos completos de la solicitud
        this.solicitudDatosCompletos = datos.solicitud;
        this.nitCliente = (datos.solicitud.cliente.nit).toString();
        this.idCliente = (datos.solicitud.cliente).toString();
        this.nombreCliente = (datos.solicitud.cliente.nombre).toString();
        this.direccionCliente = (datos.solicitud.cliente.direccion).toString();
        this.telefonoCliente = (datos.solicitud.cliente.telefono).toString();
        this.datosTotalValor = this.solicitudDatosCompletos.valorTotal;
        this.subtotal = this.datosTotalValor / 1.19;
        this.iva = this.datosTotalValor - this.subtotal;
        //los items de la solicitud
        this.items = datos.solicitud.item;
        this.cerrada = this.solicitudDatosCompletos.estado;
        this.idSolicitud = this.idSolicitud = datos.solicitud._id;
      })
  }
  //=========================INSERTAR ITEMS EN LA SOLICITUD========================//
  InsertarItem(formData: any, formDirective: FormGroupDirective){
   //debugger;
   var formModel  = this.form.value;
   var random = Math.round(Math.random()*(5000000 - 1000000)+1000000); 
   var saveItem: SolicitudModel = {
      item: {
        tipovalvula :formModel.tipovalvula as string,
        tiposello :formModel.tiposello as string,
        diametro :formModel.diametro as string,
        rating :formModel.rating as string,
        material :formModel.material as string,
        otrosdatos :formModel.otrosdatos as string,
        tipomtto :formModel.tipomtto as string,
        prioridad :formModel.prioridad as string,
        dificultad :formModel.dificultad as string,
        sitio :formModel.sitio as string,
        cantidad :formModel.cantidad as number,
        valor : random as number,
        fechaRequerida : formModel.fechareq as string
      },
      valorTotal : this.cantidad * random
    };

    this.tvalvula = saveItem.item.tipovalvula;
    this.tmantenimiento = saveItem.item.tipomtto;

    /*===========SI EL MANTENIMIENTO ES BASICO==================*/
        /*1-*Traemos las actividades para agregarlas a las tareas**/
    if(this.tmantenimiento ==="Basico"){
      this._ValvulasService.listarActividadesBasicas(this.tvalvula)
      .subscribe((datos:any)=>{
        console.log(datos);
        this.tareas = datos.basicas;
        saveItem.item.tareas = this.tareas
        /*2-*Guardamos el item**/
        this._itemService.AgregarItem(saveItem, this.idCliente)
          .subscribe((item)=>{
            this.item = item
            this.datosTotalValor = item.valorTotal;
            this.listarSolicitudCompleta();
            
          })
          let intervalo = setTimeout(()=>{
            this.listarSolicitudCompleta();
          },500);
        
      });
    }
    /*=============SI EL MANTENIMIENTO ES GENERAL=============*/
    if(this.tmantenimiento ==="General"){
      /*1-*Traemos las actividades para agregarlas a las tareas**/
      this._ValvulasService.listarActividadesGenerales(this.tvalvula)
        .subscribe((datos:any)=>{
          console.log(datos.generales);
          this.tareas = datos.generales;
          saveItem.item.tareas = this.tareas
          /*2-*Guardamos el item**/
          this._itemService.AgregarItem(saveItem, this.idCliente)
            .subscribe((item)=>{
              this.item = item
              this.datosTotalValor = item.valorTotal;
              this.listarSolicitudCompleta();
              
            })
            let intervalo = setTimeout(()=>{
              this.listarSolicitudCompleta();
            },500);
        });
    }
 }
//========================BORRAR ITEMS DE LA SOLICITUD==========================//
  borraritem(index){
    swal({
      title: "Esta seguro?",
      text: "Esta a punto de borrar un item ",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
        this._itemService.EliminarItem(index).subscribe(
          response=>{
            this.ngOnInit();
            console.log("item borrado");
            swal("El item ha sido borrado", {
              icon: "success",
            });
            let cargar = setTimeout(()=>{
              console.log("setTimeout");
            },300);
          },
          error=>{
            console.log(error);
          }
        )

      } else {
        swal({
          icon:"info",
          text:"El item no sera borrado"
        });
      }
    }); 
    
  }
  /*========CARGAR LOS TIPOS DE VALVULAS EN EL SELECT==========*/
  listarTiposdeValvulas(){
    this._ValvulasService.cargarValvulas()
      .subscribe((datos)=>{
        
        this.tiposValvula = datos;
      })
  }
  //==================CAPTURAR EL TIPO DE MANTENIMIENTO==========//
  capturaMantenimiento(){
    this._ValvulasService.listarActividadesBasicas(this.tvalvula)
      .subscribe((datos)=>{
        console.log(datos);
      })
  }
  /*============TRAER LAS TAREAS DEL TIPO DE VALVULA============*/
  traerLasTareas(){
    this._ValvulasService.listarActividadesBasicas(this.tvalvula)
    .subscribe((datos:any)=>{
      console.log(datos.basicas);
      this.tareas=datos.basicas;
      console.log(this.tareas);
      return datos.basicas;
      
    });
  }
  //===========================CERRAR LA SOLICITUD=====================//
  cerrarSolicitud(){
    this.solicitudDatosCompletos.estado = 'CERRADA'
    this.cerrada = this.solicitudDatosCompletos.estado
    console.log(this.solicitudDatosCompletos.item[0]==undefined);
    if(this.solicitudDatosCompletos.item[0]==undefined){
      this.solicitudDatosCompletos.estado = 'CREADA'
      this.cerrada = this.solicitudDatosCompletos.estado
      swal('Error', 'no contiene items', 'error')
      return false;
    }else{
      this._solicitudServices.actualizarSolicitud(this.solicitudDatosCompletos._id, this.solicitudDatosCompletos)
      .subscribe((datos:any)=>{
      });
    }
  

  }
  //===========================MOSTRAR LAS ACTIVDIADES==================//
  actividadesr(valor){
    console.log(valor);
    this.actividades = valor.tareas;
    console.log(this.actividades);
  }
  //=========CARGAR SI ES ADMIN PARA MOSTRAR LOS VALORES ==============//
  cargarRoleStorage(){
    if(localStorage.getItem('token')){
      let usuario = JSON.parse(localStorage.getItem('usuario'));
      this.usuarioROLE = usuario.role;
      console.log(this.usuarioROLE);
      
    }
  }
 
  




  

}
