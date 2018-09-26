import { Component, OnInit } from '@angular/core';
import { ItemService, ClienteService, SolicitudService } from '../../services/service.index';
import { URL_SERVICIOS } from '../../config/config';
import { ItemModel } from '../../models/itemModel';
import { SolicitudModel, Atributo, Tarea } from '../../models/solicitudModel';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { forEach } from '@angular/router/src/utils/collection';
import { ClienteModel } from '../../models/clienteModel';
import { ValvulaModel} from '../../models/ValvulaModel';


@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit {
  /*MANIPULACION DE LOS DATOS*/  
  items : ItemModel[]=[];
  item : ItemModel;
  solicitudDatosCompletos : SolicitudModel;
  cerrada : string ;
 
  cantidad : number;
  datosTotalValor : number;
  

  /*COTIZACION*/ 
  idSolicitud : any;
  nombreCliente : any;
  nitCliente : any;
  direccionCliente :any;
  telefonoCliente: any;
  HH: number;
  subtotal: number;
  iva:number;
  fecha : any;
  
  
  

  idCliente : any;
  tiposValvula : any;

  /*PROPIEDADES PARA INCRUSTAR TAREAS*/


  constructor(
    private _itemService:ItemService,
    private _solicitudServices: SolicitudService,
    private _cliente : ClienteService,
    private _route : ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    //obtiene el id de la solicitud desde el servicio
      this._itemService.obtenerSolicitud();
    //me lista la solicitud completa
      this.listarSolicitudCompleta();
      
  }

    //======================LISTAR SOLICITUD COMPLETA===============================//
    listarSolicitudCompleta(){ 
      this._itemService.listarItemssolicitudes()
        .subscribe((datos)=>{
          //los datos completos de la solicitud
          this.idSolicitud = datos.solicitud._id;
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
          this.fecha = datos.solicitud.date;
          
        })
    }

}
