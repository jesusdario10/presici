import { Component, OnInit } from '@angular/core';
import { CargosService } from '../../../services/service.index';
import { URL_SERVICIOS } from '../../../config/config';
import { ItemModel } from '../../../models/itemModel';
import { CargoModel } from '../../../models/cargoModel';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';


@Component({
  selector: 'app-edit-cargos',
  templateUrl: './edit-cargos.component.html',
  styleUrls: ['./edit-cargos.component.css']
})
export class EditCargosComponent implements OnInit {
  form: FormGroup;
  formSubmit: boolean;
  datosCargo :CargoModel[]=[];
  datosCargo2 :CargoModel;
  id : string;

  constructor(
    private _cargosServices:CargosService,
    private _route : ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) =>{
      this.id = params.id;
      this.mostrarDatos(this.id);
     
     
    });

    this.form = this.fb.group({
      nombre: [ "", Validators.required ],
      valorHora: [ 0 , Validators.required ]
    });

  }
  actualizarCargo(formData: any, formDirective: FormGroupDirective){
    const formModel  = this.form.value;
    const updateCargo: CargoModel = {
       nombre :formModel.nombre as string,
       valorHora :formModel.valorHora as number
    };

    this._cargosServices.actualizarCargo(updateCargo, this.datosCargo2._id)
      .subscribe((datos:any)=>{
        console.log("cargo actualizado");
        console.log(datos);
      })
  }
  //*********************MOSTRAR DATOS DE UN CARGO*********************** */
  mostrarDatos(id){
    
    this._cargosServices.listarUnCargo(id)
      .subscribe((datos:any)=>{
        console.log("en el componente viene el datos cargo2");
        
        this.datosCargo = datos.cargo;
        
        this.datosCargo2 = datos.cargo;
        
      })
  }

}
