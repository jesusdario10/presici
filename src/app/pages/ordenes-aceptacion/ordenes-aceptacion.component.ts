import { Component, OnInit } from '@angular/core';
import { SolicitudModel, Atributo } from '../../models/solicitudModel';
import { SolicitudService, ItemService, ValvulasService } from '../../services/service.index';
import { FormsModule, FormGroup, Validators, FormBuilder, FormGroupDirective } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordenes-aceptacion',
  templateUrl: './ordenes-aceptacion.component.html',
  styleUrls: ['./ordenes-aceptacion.component.css']
})
export class OrdenesAceptacionComponent implements OnInit {

  solicitudes : SolicitudModel[]=[];
  

  
  item : Atributo;
  form: FormGroup;
  formSubmit: boolean;
  estado:string;
  

  constructor(
    public _solicitudServices : SolicitudService,
    public _itemService : ItemService,
    public _ValvulasService : ValvulasService,
    public _router : Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.cargarSolicitudes();
  }
  cargarSolicitudes(){
    this._solicitudServices.cargarSolicitudesCreadasOCerradas()
      .subscribe((resp:any)=>{
        console.log("la respuesta");
        console.log(resp);
        this.solicitudes = resp;
    }); 
  }
  //========================CAMBIAR DE ESTADO=======================//
  CambiarEstado(id, solicitud: SolicitudModel){
    solicitud.estado = this.estado;
    
    this._solicitudServices.actualizarSolicitud(id, solicitud)
        .subscribe((datos:any)=>{
          this.cargarSolicitudes();
        });
    
  }
  //=====================CAPTURAR ID DE LA SOLICITUD================//
  capturarSolicitud(solicitud){
    let idsolicitud = solicitud._id;
  }

}
