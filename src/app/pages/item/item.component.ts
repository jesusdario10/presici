import { Component, OnInit } from '@angular/core';
import { ItemService, ClienteService } from '../../services/service.index';
import { URL_SERVICIOS } from '../../config/config';
import { ItemModel } from '../../models/itemModel';
import { SolicitudModel, Atributo } from '../../models/solicitudModel';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { forEach } from '@angular/router/src/utils/collection';
import { ClienteModel } from '../../models/clienteModel';

declare var swal:any;


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  /*MANIPULACION DE LSO DATOS*/  
  items : ItemModel[]=[];
  item : ItemModel;
  solicitudDatosCompletos : SolicitudModel;
 
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


  constructor(
    private _itemService:ItemService,
    private _cliente : ClienteService,
    private _route : ActivatedRoute,
    private fb: FormBuilder
  ) { 
    
    
  }


  ngOnInit() {
    //obtiene el id de la solicitud desde el servicio
    this._itemService.obtenerSolicitud();
    //me lista la solicitud completa
    this.listarSolicitudCompleta();
    
    

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
    });
  }
  listarSolicitudCompleta(){
    
    this._itemService.listarItemssolicitudes()
      .subscribe((datos)=>{
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
        this.items = datos.solicitud.item
        
        
      })
  }

  InsertarItem(formData: any, formDirective: FormGroupDirective){
   //debugger;
   const formModel  = this.form.value;
   let random = Math.round(Math.random()*(5000000 - 1000000)+1000000); 
   const saveItem: SolicitudModel = {
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
      valor : random as number
    },
    valorTotal : this.cantidad * random
  };
  this._itemService.AgregarItem(saveItem, this.idCliente)
    .subscribe((item)=>{
      this.item = item
      this.datosTotalValor = item.valorTotal;
      this.listarSolicitudCompleta();
      
    })
    let intervalo = setTimeout(()=>{
      this.listarSolicitudCompleta();
    },500);
    
  
  }
  //borrar items

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

 
  




  

}
