import { Component, OnInit } from '@angular/core';
import { SolicitudModel } from '../../models/solicitudModel';
import { SolicitudService } from '../../services/service.index';
import { FormsModule } from '@angular/forms'
import { MedicoModel } from '../../models/medicoModel';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {
  solicitudes : SolicitudModel[]=[];
  public solicitud :SolicitudModel;
  public campo1 : string;
  public campo2 : string;
  public item : [{
    _id:string,
    campo1:string,
    campo2:string
  }]
  constructor(
    public _solicitudServices : SolicitudService
  ) { 
    this.solicitud = new SolicitudModel(this.item, "", "", "" );

  }

  ngOnInit() {
    this.cargarSolicitudes();
  }
  crearSolicitud(solicitud:SolicitudModel){
    this.item = [{
      _id:"",
      campo1:this.campo1,
      campo2:this.campo2
    }]
    this.solicitud.item = this.item;

    this._solicitudServices.crearSolicitud(solicitud)
      .subscribe((solicitud)=> console.log(solicitud));   
      this.cargarSolicitudes() ;
 
      console.log(this.solicitud);
  }
  cargarSolicitudes(){

    this._solicitudServices.cargarSolicitudes()
      .subscribe(solicitudes=>this.solicitudes=solicitudes)
  }
  




}
