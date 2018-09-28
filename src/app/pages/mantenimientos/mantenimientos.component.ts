import { Component, OnInit } from '@angular/core';
import { MantenimientoModel } from '../../models/mantenimientoModel';
import { MantenimientoService } from '../../services/service.index';
import { FormsModule, FormGroup, Validators, FormBuilder, FormGroupDirective } from '@angular/forms'


@Component({
  selector: 'app-mantenimientos',
  templateUrl: './mantenimientos.component.html',
  styleUrls: ['./mantenimientos.component.css']
})
export class MantenimientosComponent implements OnInit {
  mantenimiento : MantenimientoModel;
  idMtto : string;
  tareas : any[]=[];


  //==========DATOS DEL MANTENIMIENTO========//
  serie : string;
  tipovalvula:string;
  tiposello : string;
  diametro : string;
  rating : string;
  material : string;
  otrosDatos : string;
  tipoMtto :string;
  prioridad : string;
  ubicacion : string;
  dificultad :string;
  obsTipovalvula :string; 
  obsCuerpo :string;
  obsComponentes :string;
  obsTmttoPrioUbi :string;
  obsDificultad :string;

  //====PROPIEDADES DE LAS OBSERVACIONES DEL MANTENIMIENTO==========================//
  form: FormGroup;
  formSubmit: boolean;
  

  constructor(
    private _mantenimientoService : MantenimientoService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.obtenerIdMtto();
    this.listarUnMantenimiento();
    //------------inicializar el formulario de observaciones--------------------------//
    this.form = this.fb.group({
      obsTipovalvula: ["", Validators.required ],
      obsCuerpo:      ["", Validators.required ],
      obsComponentes: ["", Validators.required ],
      obsTmttoPrioUbi:["", Validators.required ],
      obsDificultad:  ["", Validators.required ]
      
    });
  }
  //===========CAPTURANDO EL ID DEL MANTENIMIENTO====================================//
  obtenerIdMtto(){
    let urlActual = window.location.href;
    let extraer = urlActual.split('/');
    let id = extraer[5];
    this.idMtto = id;
  }
  //===========OBTENER UN MANTENIMIENTO===============================================//
  listarUnMantenimiento(){
    console.log(this.idMtto);
    this._mantenimientoService.encontrarUnMantenimiento(this.idMtto)
      .subscribe((datos:any)=>{
        console.log(datos.mantenimiento);
        this.tareas = datos.mantenimiento.tareas;
        this.mantenimiento = datos.mantenimiento;
        //---------------Mostrando Datos----------------------//
        this.serie = datos.mantenimiento.serie;
        this.tipovalvula = datos.mantenimiento.tipovalvula.nombre;
        this.tiposello = datos.mantenimiento.tiposello;
        this.diametro = datos.mantenimiento.diametro;
        this.rating = datos.mantenimiento.rating;
        this.material = datos.mantenimiento.material;
        this.otrosDatos = datos.mantenimiento.otrosdatos;
        this.tipoMtto = datos.mantenimiento.tareas[0].tipo;
        this.prioridad = datos.mantenimiento.prioridad;
        this.ubicacion = datos.mantenimiento.sitio;
        this.dificultad = datos.mantenimiento.dificultad;
        this.obsTipovalvula = datos.mantenimiento.obsTipovalvula;
        this.obsCuerpo =  datos.mantenimiento.obsCuerpo;
        this.obsComponentes = datos.mantenimiento.obsComponentes;
        this.obsTmttoPrioUbi = datos.mantenimiento.obsTmttoPrioUbi;
        this.obsDificultad = datos.mantenimiento.obsDificultad;   
    })
  }
  //=============ACTUALIZAR LAS OBSERVACIONES DEL MANTENIMIENTO ==========================//
  actualizarObservaciones(formData: any, formDirective: FormGroupDirective){
    const formModel  = this.form.value;

    const saveObsMtto : MantenimientoModel = {
      obsTipovalvula :  formModel.obsTipovalvula as string,
      obsCuerpo :       formModel.obsCuerpo as string,
      obsComponentes :  formModel.obsComponentes as string,
      obsTmttoPrioUbi : formModel.obsTmttoPrioUbi as string,
      obsDificultad :   formModel.obsDificultad as string,
    }
    this._mantenimientoService.actualizarObsMtto(saveObsMtto, this.idMtto)
      .subscribe((datos:any)=>{
        
      })



  }
  //=============COMPLETAR ACTIVIDAD / TAREA =============================================//
  actualizarEstadoyDatosdelaTarea(tarea, index){
    this._mantenimientoService.actualizarEstadodeTareasdeValvulas(tarea, this.idMtto, index)
      .subscribe((datos:any)=>{
        console.log(datos);
    })
    
      

  }

}
