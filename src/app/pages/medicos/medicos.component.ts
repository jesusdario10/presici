import { Component, OnInit } from '@angular/core';
import { HospitalModel } from '../../models/hospitalModel';
import { MedicoModel } from '../../models/medicoModel';
import { HospitalService, MedicoService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Router, RouterModule  } from '@angular/router';
@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  medicos : MedicoModel[]=[];
  totalRegistros : number =0;
  desde : number = 0;

  constructor(
    public _medicoServices : MedicoService,
    public _router :Router
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }
  cargarMedicos(){
    this._medicoServices.cargarMedicos(this.desde)
      .subscribe(medicos=> this.medicos = medicos)
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
    this.desde +=5;
    console.log(desde);
    this.cargarMedicos();
  }
  buscarMedico(termino:string){
    if(termino.length<=0){
      this.cargarMedicos()
      return;
    }
    this._medicoServices.buscarMedico(termino)
      .subscribe(medicos=>this.medicos=medicos)
  }
  crearMedico(){
    this._router.navigate(['/medico/nuevo']);
  }
  borrarMedico(medico: MedicoModel){
    this._medicoServices.borrarMedico(medico._id)
      .subscribe(()=> this.cargarMedicos())
  }

}
