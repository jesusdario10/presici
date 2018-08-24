import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, Validators, FormBuilder, FormGroupDirective } from '@angular/forms'
import { TipomttoService, TareaService  } from '../../services/service.index';
import { TareaModel } from '../../models/tareaModel';
import { TipomttoModel } from '../../models/tipomtto';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})
export class TareaComponent implements OnInit {
  public tarea : TareaModel;
  public tareaLista : TareaModel[]=[];
  public tipomtto : TipomttoModel[]=[];
  form: FormGroup;
  formSubmit: boolean;

  constructor(
    private _tipomttoServices : TipomttoService,
    private fb: FormBuilder,
    private _tareaService : TareaService
  ) { }

  ngOnInit() {
    this.cargarTiposMtto();
    this.cargarTareas();
    this.form = this.fb.group({
      nombreTarea: [ "", Validators.required ],
      tipomtto1: [ "", Validators.required ],
      tipomtto2: [ "", Validators.required ],
      tipomtto3: [ "", Validators.required ],
      valor: [ 0, Validators.required ]
      
    });
  }
  
  crearTarea(formData: any, formDirective: FormGroupDirective){
    const formModel  = this.form.value;

    const saveTarea: TareaModel = {
      nombre: formModel.nombreTarea as string,
      tipomtto1:formModel.tipomtto1 as string,
      tipomtto2:formModel.tipomtto2 as string,
      tipomtto3:formModel.tipomtto3 as string,
      valor:formModel.valor as number
    };
    this._tareaService.crearTarea(saveTarea)
      .subscribe((tareaCreada)=>{
        console.log(tareaCreada);
      })
      formData.reset();
      let Timeout = setTimeout(()=>{
        this.cargarTareas();
      },200)
  }
    cargarTareas(){
      this._tareaService.listarTareas()
      .subscribe(tareas=>{
        this.tareaLista=tareas
        
      })
    }


  //cargar tipos mtto
  cargarTiposMtto(){
    this._tipomttoServices.cargarTipoMtto()
    .subscribe(tiposMtto=>{
      this.tipomtto=tiposMtto
      
    })
  }

}
