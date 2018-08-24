import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, Validators, FormBuilder, FormGroupDirective } from '@angular/forms'
import { TipomttoService  } from '../../services/service.index';
import { TipomttoModel } from '../../models/tipomtto';
@Component({
  selector: 'app-tipomtto',
  templateUrl: './tipomtto.component.html',
  styleUrls: ['./tipomtto.component.css']
})
export class TipomttoComponent implements OnInit {
  public tipoMtto : TipomttoModel;
  public tipoMttoLista : TipomttoModel[]=[];
  form: FormGroup;
  formSubmit: boolean;


  constructor(
    private _tipomttoServices : TipomttoService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.cargarTipoMtto();
    this.form = this.fb.group({
      nombre: [ null, Validators.required ]
    });
  }
  crearTipoMtto(formData: any, formDirective: FormGroupDirective){
    const formModel  = this.form.value;
    const saveTipoMtto: TipomttoModel = {
      nombre: formModel.nombre as string
    };
    console.log(saveTipoMtto);
    this._tipomttoServices.crearTipoMtto(saveTipoMtto)
      .subscribe((saveTipoMtto)=>{
        console.log("tipomttoCreado");
        this.cargarTipoMtto();
      });
      formData.reset();
      let Timeout = setTimeout(()=>{
        this.cargarTipoMtto();
      },200)
  }
  cargarTipoMtto(){

    this._tipomttoServices.cargarTipoMtto()
      .subscribe(tiposMtto=>{
        this.tipoMttoLista=tiposMtto
        console.log(tiposMtto);
      })
      
  }

}
