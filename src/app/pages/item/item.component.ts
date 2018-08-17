import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/service.index';
import { URL_SERVICIOS } from '../../config/config';
import { ItemModel } from '../../models/itemModel';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var swal:any;


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  items : ItemModel[]=[];
  items2 : ItemModel[]=[];
  public item : ItemModel;
  id_solicitud :string;
  cantidades : number;
  datosTotalValor : number;
 

  

  constructor(
    private _itemService:ItemService,
    private _route : ActivatedRoute
  ) { 
    this.item = new ItemModel("","","","","","","","","","","",0,"",0);
    this._itemService.obtenerSolicitud();
    
  }
  cargarItem(){
    this._itemService.cargarItems()
      .subscribe((resp:any)=>{
        console.log("10000000000");
        console.log(resp);
       this.items=resp   
      })
  }
  cargarItem2(){
    this._itemService.cargarItems2()
      .subscribe((datos:any)=>{
        this.items2 = datos;
        this.datosTotalValor = datos.valorTotal;
        this.cantidades = datos.sumatoria;
        console.log(datos);
      })
  }

 
  ngOnInit() {
    this.cargarItem(); 
    this._route.params.subscribe((params:Params)=>{
      this.id_solicitud = params.id;
      this._itemService.obtenerSolicitud();   
      this.cargarItem2();
    })
  }
  crearItem(form){

    let item2 = this.item;
    this._itemService.crearItem(item2)
      .subscribe((itemGuardado)=> console.log(itemGuardado));
      form.reset();
      this.cargarItem(); 
      
      swal('Creado', 'item Creado Correctamente', 'success'); 
      let cargar = setTimeout(()=>{
        console.log("setTimeout");
        this.cargarItem();
       
      },300) 
      let cargar2 = setTimeout(()=>{
        console.log("setTimeout");
        this.cargarItem2();
       
      },500) 
  }
  //borrar items
  borrarItem(id){
    swal({
      title: "Esta seguro?",
      text: "Esta a punto de borrar un item ",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
        this._itemService.deleteItem(id).subscribe(
          response=>{
            console.log("item borrado");
            swal("El item ha sido borrado", {
              icon: "success",
            });
            let cargar = setTimeout(()=>{
              console.log("setTimeout");
              this.cargarItem();
             
            },300) 
            let cargar2 = setTimeout(()=>{
              console.log("setTimeout");
              this.cargarItem2();
             
            },200) 
          },
          error=>{
            console.log(error);
          }
        )

      } else {
        swal("El item no sera borado");
      }
    });
  }

  /*//obtener item para actualizar
  getProject(id){
    this._projectService.getProject(id).subscribe(
      response =>{
        this.project = response.project
      },
      error=>{
        console.log(error);
      }
    )
  }
  //actualziar item
  actualizarItem(id){
    this._itemService.updateItem(this.item, id).subscribe(
      response=>{
        console.log("item editado");
      },
      error=>{
        console.log(error);
      }

    )
  }*/
 





  

}
