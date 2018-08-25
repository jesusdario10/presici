import { Component, OnInit } from '@angular/core';
import { SolicitudModel, Atributo } from '../../models/solicitudModel';
import { SolicitudService, ItemService } from '../../services/service.index';
import { FormsModule, FormGroup, Validators, FormBuilder, FormGroupDirective } from '@angular/forms'

import { MedicoModel } from '../../models/medicoModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css']
})
export class OrdenesComponent implements OnInit {
  solicitudes : SolicitudModel[]=[];
  
  item : Atributo;
  form: FormGroup;
  formSubmit: boolean;
  estado:string;
  

  constructor(
    public _solicitudServices : SolicitudService,
    public _itemService : ItemService,
    public _router : Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.cargarSolicitudes();

  }
  cargarSolicitudes(){

    this._solicitudServices.cargarSolicitudes()
      .subscribe(solicitudes=>{
        this.solicitudes=solicitudes
        console.log(this.solicitudes);
      }) 
  }
  cambiaEstado(id){
    let estado = document.getElementById("estado")
    let campo = estado.value
    console.log(estado);
    console.log(campo);
    console.log(id);
    const actSolicitud: SolicitudModel = {
      estado: campo
    };
    this._solicitudServices.actualizarSolicitud(actSolicitud, id)
      .subscribe((actSolicitud)=>console.log(actSolicitud))
    
       
  }
  

}
