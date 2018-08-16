import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../services/service.index';
import { URL_SERVICIOS } from '../../../config/config';
import { ItemModel } from '../../../models/itemModel';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  items : ItemModel[]=[];
  public item : ItemModel;
  id_solicitud :string;
  cantidad : number;
  elarray:any;
  

  constructor(
    private _itemService:ItemService,
    private _route : ActivatedRoute
  ) { 
    this.item = new ItemModel("","","","","","","","","","","",0,"");
    this._itemService.obtenerSolicitud();
    
  }
  cargarItem(){
    this._itemService.cargarItems()
      .subscribe(items=>{
       this.items=items
       return items
      })
      
     
  }
 
  ngOnInit() {
    this.cargarItem(); 
    console.log(this.cargarItem);
    this._route.params.subscribe((params:Params)=>{
      this.id_solicitud = params.id;
      this._itemService.obtenerSolicitud()
      
    })
  }
  crearItem(item:ItemModel){

    let item2 = this.item;
    this._itemService.crearItem(item2)
      .subscribe((itemGuardado)=> console.log(itemGuardado));
      this.cargarItem(); 
      swal('Creado', 'item Creado Correctamente', 'success'); 
      let cargar = setTimeout(()=>{
        console.log("setTimeout");
        this.cargarItem();
       
      },300) 
  }
 





  

}
