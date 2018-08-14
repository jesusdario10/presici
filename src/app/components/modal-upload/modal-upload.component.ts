import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  imagenSubir: File;
  imagenTemp : string;

  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) { 
    
  }

  ngOnInit() {
  }
  cerrarModal(){
    this.imagenTemp=null;
    this.imagenSubir=null;
    
    this._modalUploadService.ocultarModal()
  }
  seleccionImagen(archivo){
    this.imagenSubir= null;
    if(!archivo){
      return
    }
    //este if es para comprobar si el archivo es una imagen
    if(archivo.type.indexOf('image')<0){
      swal('Solo imagenes', 'El archivo selecconado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
      
    }
    //si si viene archivo
    this.imagenSubir = archivo

    //cargar la imagen temporal
    var reader = new FileReader();
    var urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onload=()=>{
      this.imagenTemp = reader.result;
    }
  }
  subirImagen(){
    this._subirArchivoService.subirArchivo(this.imagenSubir,
                  this._modalUploadService.tipo,
                  this._modalUploadService.id)
                        .then(resp=>{
                          console.log(resp);
                          this._modalUploadService.notificacion.emit(resp);//emito respuesta
                          this._modalUploadService.ocultarModal();//oculto el modal

                        })
                        .catch(err=>{
                          console.log("error en al carca...");
                        });
  }

}
