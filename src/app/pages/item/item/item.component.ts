import { Component, OnInit } from '@angular/core';
import { SolicitudModel } from '../../../models/solicitudModel';
import { SolicitudService } from '../../../services/service.index';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  public solicitud : SolicitudModel


  constructor(
    public _solicitudService : SolicitudService
  ) { }

  ngOnInit() {
  }
  actualizar(){
    console.log(this.solicitud.item);
    /*this._solicitudService.actualizarSolicitud(this.solicitud.item)
    .subscribe();*/
      
  }
  

}
