import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, Validators, FormBuilder, FormGroupDirective } from '@angular/forms'
import { ValvulaModel, Actividades } from '../../models/ValvulaModel';
import { ValvulasService } from '../../services/service.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-valvulas',
  templateUrl: './valvulas.component.html',
  styleUrls: ['./valvulas.component.css']
})
export class ValvulasComponent implements OnInit {
  valvulas : ValvulaModel[]=[];
  actividades : Actividades;

  form :FormGroup;
  formSubmit:boolean;

  constructor(
    private _valvulaService : ValvulasService,
    private fb :FormBuilder,
    private _router : Router
  ) { }

  ngOnInit() {
    this.listarValvulas();
    this.form = this.fb.group({
      nombre:["", Validators.required],
      actividades:[null, Validators.required]

    })
  }
  //ListarValvulas
  listarValvulas(){
    this._valvulaService.cargarValvulas()
      .subscribe((datos:any)=>{
        console.log(datos);
        this.valvulas = datos;
      })
  }
  //Crear Tipos de Valvulas
  crearTipoValvula(formData: any, formDirective: FormGroupDirective){

    const formModel  = this.form.value;

    const saveValvula : ValvulaModel={
      nombre : formModel.nombre as string
    }

    this._valvulaService.crearValvulas(saveValvula)
     .subscribe((datos)=>{
       console.log(datos);
       this.listarValvulas();
       formData.reset();
     })

    
  }




}
