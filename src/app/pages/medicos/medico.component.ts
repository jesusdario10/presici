import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HospitalModel } from '../../models/hospitalModel';
import { MedicoService, HospitalService } from '../../services/service.index';
import { MedicoModel } from '../../models/medicoModel';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: HospitalModel[]=[];
  medico : MedicoModel = new MedicoModel("","","","");

  constructor(
    public _medicoService : MedicoService,
    public _hospitalServices : HospitalService
  ) { }

  ngOnInit( ) 
  {
    this._hospitalServices.cargarHospitales()
      .subscribe(hospitales=>this.hospitales = hospitales)
  }
  guardarMedico(f:NgForm){
    console.log(f.valid);
    console.log(f.value);
    if(f.invalid){
      return;
    }
    this._medicoService.crearMedico(this.medico)
      .subscribe(medico=>{
        console.log(medico);
      })
  }

}
