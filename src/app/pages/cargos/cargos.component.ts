import { Component, OnInit } from '@angular/core';
import { CargoModel } from '../../models/cargoModel';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { CargosService } from '../../services/service.index';

@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.css']
})
export class CargosComponent implements OnInit {
  cargos : CargoModel[]=[];
  datosCargo : CargoModel[]=[];
  datosCargo2 : CargoModel;
  form: FormGroup;
  form2: FormGroup;
  formSubmit: boolean;

  constructor(
    private _cargosServices:CargosService,
    private _route : ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.listarCargos();
    this.form = this.fb.group({
      nombreO: [ "", Validators.required ],
      valorHoraO: [ 0, Validators.required ]
    });
  }
  /*******************LISTAR CARGOS******************** */
  listarCargos(){
    this._cargosServices.listarCargos()
      .subscribe((datos:any)=>{
        console.log(datos);
        this.cargos = datos.cargos
      })
  }
    //*********************MOSTRAR DATOS DE UN CARGO*********************** */
    mostrarDatos(id){
      console.log(id);
      this._cargosServices.listarUnCargo(id)
        .subscribe((datos:any)=>{
          console.log("en el componente viene el datos cargo2");
          this.datosCargo = datos.cargo;
          this.datosCargo2 = datos.cargo;
          console.log(this.datosCargo2);
        })
    }
    //*********************ACTUALZIAR CARGO*********************** */
    actualizarCargo(){
      console.log("aqui viene el valor de datosCargo2 cuando se actualiza");
      console.log(this.datosCargo2);
      this._cargosServices.actualizarCargo(this.datosCargo2, this.datosCargo2._id)
        .subscribe((datos:any)=>{
          console.log("cargo actualizado");
          console.log(datos);
        })
        let intervalo = setTimeout(() => {
          this.listarCargos();
        }, 200);
    }
    //*********************CREAR CARGO FALTA ESTA FUNCION*********************** */
    crearCargoL(formData: any, formDirective: FormGroupDirective){
      const formModel  = this.form.value;
      let saveCargo: CargoModel = {
        
          nombre :formModel.nombreO as string,
          valorHora :formModel.valorHoraO as number    
      };
      this._cargosServices.crearCargo(saveCargo)
        .subscribe((datos)=>{
          console.log("creado");
        })
        let intervalo = setTimeout(() => {
          this.listarCargos();
        }, 200);  
    }

}






























