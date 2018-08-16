import { Component, OnInit } from '@angular/core';
import { SolicitudModel } from '../../models/solicitudModel';
import { SolicitudService, ItemService } from '../../services/service.index';
import { FormsModule } from '@angular/forms'

import { MedicoModel } from '../../models/medicoModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {
  solicitudes : SolicitudModel[]=[];
  public solicitud :SolicitudModel;

  dc:string;
  constructor(
    public _solicitudServices : SolicitudService,
    public _itemService : ItemService,
    public _router : Router
  ) { 
    this.solicitud = new SolicitudModel("", "");

  }

  ngOnInit() {
    this.cargarSolicitudes();
    console.log("que estoy recibiendo");
    
  }
  crearSolicitud(solicitud:SolicitudModel){
    let solicitud2 = this.solicitud

    this._solicitudServices.crearSolicitud(solicitud2)
      .subscribe((solicitud)=> console.log(solicitud));   
      this.cargarSolicitudes();
      
      let cargar = setTimeout(()=>{
        console.log("setTimeout");
        this.cargarSolicitudes();
      },10)   
  }
  cargarSolicitudes(){

    this._solicitudServices.cargarSolicitudes()
      .subscribe(solicitudes=>this.solicitudes=solicitudes)
  }

  




}
