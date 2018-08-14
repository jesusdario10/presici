import { Component, OnInit } from '@angular/core';
import { HospitalModel } from '../../models/hospitalModel';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'
declare var swal :any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  hospitales : HospitalModel[]=[];
  totalRegistros : number =0;
  desde : number = 0;

  constructor(
    public _hospitalService : HospitalService,
    public _modalUploadService :ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion
      this._modalUploadService.notificacion
      .subscribe(resp=>{
        this.cargarHospitales()
      })
  }
  cargarHospitales(){
    this._hospitalService.cargarHospitales(this.desde)
      .subscribe(hospitales=> this.hospitales = hospitales)
  } 
  cambiarDesde(valor:number){
    let desde = this.desde + valor;
    console.log(desde);
    if(desde>=this.totalRegistros){
      return
    }
    if(desde<0){
      return
    }
    this.desde +=valor;
    console.log(desde);
    this.cargarHospitales();
  }
  buscarHospital(termino:string){
    if(termino.length<=0){
      this.cargarHospitales()
      return;
    }
    this._hospitalService.buscarHospital(termino)
      .subscribe(hospitales=>this.hospitales=hospitales)
  }
  borrarHospital(hospital: HospitalModel){
    this._hospitalService.borrarHospital(hospital._id)
      .subscribe(()=> this.cargarHospitales())
  }
  actualizarHospital(hospital: HospitalModel){
    this._hospitalService.actualizarHospital(hospital)
      .subscribe();
  }
  crearHospital(){
    swal({
      title:'CrearHospital',
      text:"Ingrese el nombre del Hospital",
      content:"input",
      icon:"info",
      buttons:true,
      dangerMode:true
    }).then(valor=>{
      if(!valor || valor.length<=0){
        return;
      }
      this._hospitalService.crearHospital(valor)
        .subscribe(()=>this.cargarHospitales());
    })
    console.log("asdasd");
  }
  actualizarImagen(hospital:HospitalModel){
    this._modalUploadService.mostrarModal('hospitales', hospital._id)
    
      
  }



  





}
