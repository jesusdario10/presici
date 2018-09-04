import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/service.index';
import { URL_SERVICIOS } from '../../config/config';
import { ItemModel } from '../../models/itemModel';
import { SolicitudModel, Atributo } from '../../models/solicitudModel';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { forEach } from '@angular/router/src/utils/collection';

declare var swal:any;


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  valvulas : ItemModel[]=[];
  solicitud : SolicitudModel[]=[];
  items : ItemModel[]=[];
  datos : any;
  calcantidad : number;
  HH: number;
  subtotal: number;
  iva:number;
  item : Atributo;
  form: FormGroup;
  formSubmit: boolean;
  id_solicitud :string;
  datosTotalValor : number;
  subTotal:number;


  constructor(
    private _itemService:ItemService,
    private _route : ActivatedRoute,
    private fb: FormBuilder
  ) { 
    this._itemService.obtenerSolicitud();
    
  }
  cargarItem2(){
    this._itemService.cargarItems2()
      .subscribe((datos:any)=>{
        this.valvulas = datos.solicitudes[0].item
        console.log("!!!!!!!!!!!");
        
        this.solicitud = datos.solicitudes[0];

        
        this.id_solicitud = datos.solicitudes[0]._id;
        this.datos = datos;
        this.datosTotalValor = this.datos.valorTotal;
        this.subtotal =Math.round(this.datosTotalValor/1.19)
        this.iva = Math.round(this.datosTotalValor-this.subtotal)
      })
  }
  cargarItems(id){
    this._itemService.cargarItems(id)
      .subscribe((resp:any)=>{
        console.log(resp);
      }); 
  }


  ngOnInit() {

   
   
    this.cargarItem2(); 
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
    valorTotal : this.calcantidad*random
  };
  this._itemService.AgregarItem(saveItem)
    .subscribe((item)=>{
      console.log("YYYYYYYYYYYYYYYYYYYYYYYY");
      this.valvulas = item
      console.log(item)
    })
    
    formData.reset();
    var intervalo = setTimeout(()=>{
      this.cargarItem2()
    },200)
  

  }
  //borrar items

  borrarvalvula(index){
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
            console.log("item borrado");
            swal("El item ha sido borrado", {
              icon: "success",
            });
            let cargar = setTimeout(()=>{
              console.log("setTimeout");
              this.cargarItem2();
             
            },300);
          },
          error=>{
            console.log(error);
          }
        )

      } else {
        swal({
          icon:"info",
          text:"El item no sera borado"
        });
      }
    }); 
    
  }

 





  

}
