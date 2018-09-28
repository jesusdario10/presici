import { Component, OnInit } from '@angular/core';
import { ValvulasService } from '../../services/service.index';
import { ValvulaModel, Actividades } from '../../models/ValvulaModel';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {
   actividadesBasicas : ValvulaModel[]=[];
   actividadesGenerales : ValvulaModel[]=[];
   tipoValvula : ValvulaModel;

  /*FORMULARIOS*/
   form: FormGroup;
   formSubmit: boolean;

   //capturando y mostrando para editar
   nombreEditar : string;
   idEditar : string;

  constructor(
    private _route : ActivatedRoute,
    private fb: FormBuilder,
    private _valvulaService : ValvulasService
  ) { }

  ngOnInit() {
    this._valvulaService.obtenerTipodeValvula();
    this.listarActividades();
    this.form = this.fb.group({
      nombre :["", Validators.required],
      tipo :["", Validators.required],
      estado :[false, Validators.required],
      tiempo :[0, Validators.required]

    });
  }
 
  insertarActividades(formData: any, formDirective: FormGroupDirective){
    const formModel  = this.form.value;

    const saveActividades : ValvulaModel = {
      actividades : {
        nombre: formModel.nombre as string,
        tipo: formModel.tipo as string,
        estado : false,
        tiempo : 0
      }
    }
    console.log(saveActividades);
    this._valvulaService.insertarActividades(saveActividades)
      .subscribe((datos:any)=>{
        console.log(datos);
      })
      formData.reset();
      this.listarActividades();
      let intervalo = setTimeout( ()=>{
        this.listarActividades();
      },200);
  }
  listarActividades(){
    this._valvulaService.listarActividades()
      .subscribe((datos:any)=>{
        
        this.actividadesBasicas = datos.basicas;
        this.actividadesGenerales = datos.generales;
        this.tipoValvula = datos.tipovalvula.nombre;

      })
  }
  //EDITANDO LAS ACTIVIDADES

    //1.mostrar el antiguo nombre y capturar el nuevo

    capturaDatos(actividad){
      this.nombreEditar = actividad.nombre;
      this.idEditar =actividad._id;
    }
    //2.editando





}
