import { Component, OnInit } from '@angular/core';
import { SolicitudModel, Atributo } from '../../models/solicitudModel';
import { SolicitudService, ItemService, ValvulasService } from '../../services/service.index';
import { FormsModule, FormGroup, Validators, FormBuilder, FormGroupDirective } from '@angular/forms'
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
    public _ValvulasService : ValvulasService,
    public _router : Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.cargarSolicitudes();

  }


  cargarSolicitudes(){
    this._solicitudServices.cargarSolicitudesAceptadas()
      .subscribe((resp:any)=>{
        console.log("la respuesta");
        console.log(resp);
        this.solicitudes = resp;
      }); 
  }

  CambiarEstado(id, solicitud: SolicitudModel){
    console.log(id);
    console.log(this.estado);
    solicitud.estado = this.estado;
    
    this._solicitudServices.actualizarSolicitud(id, solicitud)
        .subscribe();
  }
  capturarSolicitud(solicitud){
     console.log(solicitud.item);
    let idsolicitud = solicitud._id;

    


  }
}
