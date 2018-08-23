import { Component, OnInit } from '@angular/core';
import { SolicitudModel, Atributo } from '../../models/solicitudModel';
import { SolicitudService, ItemService } from '../../services/service.index';
import { FormsModule, FormGroup, Validators, FormBuilder, FormGroupDirective } from '@angular/forms'

import { MedicoModel } from '../../models/medicoModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {
  solicitudes : SolicitudModel[]=[];
  solicitud :SolicitudModel;
  item : Atributo;
  form: FormGroup;
  formSubmit: boolean;



  dc:string;
  constructor(
    public _solicitudServices : SolicitudService,
    public _itemService : ItemService,
    public _router : Router,
    private fb: FormBuilder
  ){ 
    

  }

  ngOnInit() {
    this.cargarSolicitudes();
    this.form = this.fb.group({
      item: [ null, Validators.required ],
      nombresolicitud: ["", Validators.required ],
      estado: ["", Validators.required ]
    });
  
    
    
  }
  crearSolicitud(formData: any, formDirective: FormGroupDirective){
    
    const formModel  = this.form.value;

    const saveSolicitud: SolicitudModel = {
      nombre: formModel.nombresolicitud as string,
      estado: "CREADA"
    };

    this._solicitudServices.crearSolicitud(saveSolicitud)
      .subscribe((saveSolicitud)=> console.log(saveSolicitud));   
      this.cargarSolicitudes();
      
      let cargar = setTimeout(()=>{
        console.log("setTimeout");
        this.cargarSolicitudes();
      },10)   
  }
  cargarSolicitudes(){

    this._solicitudServices.cargarSolicitudes()
      .subscribe(solicitudes=>{
        this.solicitudes=solicitudes
        console.log(this.solicitudes);
      })
      
  }
  cotizacion(solicitud){
    this.solicitudes = solicitud;
    console.log(this.solicitudes);
    

  }


  

  




}
