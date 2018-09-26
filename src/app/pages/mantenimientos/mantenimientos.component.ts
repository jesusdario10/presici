import { Component, OnInit } from '@angular/core';
import { MantenimientoModel } from '../../models/mantenimientoModel';
import { MantenimientoService } from '../../services/service.index';


@Component({
  selector: 'app-mantenimientos',
  templateUrl: './mantenimientos.component.html',
  styleUrls: ['./mantenimientos.component.css']
})
export class MantenimientosComponent implements OnInit {
  mantenimiento : MantenimientoModel;
  idMtto : string;
  tareas : any[]=[];

  constructor(
    private _mantenimientoService : MantenimientoService
  ) { }

  ngOnInit() {
    this.obtenerIdMtto();
    this.listarUnMantenimiento();
  }
  //===========CAPTURANDO EL ID DEL MANTENIMIENTO==============//
  obtenerIdMtto(){
    let urlActual = window.location.href;
    let extraer = urlActual.split('/');
    let id = extraer[5];
    this.idMtto = id;
  }
  //===========OBTENER UN MANTENIMIENTO=======================//
  listarUnMantenimiento(){
    console.log(this.idMtto);
    this._mantenimientoService.encontrarUnMantenimiento(this.idMtto)
      .subscribe((datos:any)=>{
        console.log(datos.mantenimiento.tareas);
        this.tareas = datos.mantenimiento.tareas;
    })
  }


}
