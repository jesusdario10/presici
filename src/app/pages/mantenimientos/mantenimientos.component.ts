import { Component, OnInit } from '@angular/core';
import { MantenimientoModel } from '../../models/mantenimientoModel';
import { MantenimientoService, SolicitudService } from '../../services/service.index';
import { FormsModule, FormGroup, Validators, FormBuilder, FormGroupDirective } from '@angular/forms'


@Component({
  selector: 'app-mantenimientos',
  templateUrl: './mantenimientos.component.html',
  styleUrls: ['./mantenimientos.component.css']
})
export class MantenimientosComponent implements OnInit {
  mantenimiento : MantenimientoModel;
  mantEstado : string;
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
  estadomtto : string = 'INICIAL';
  obsEstado : string = '';
  fechaInicio: Date;
  fechaDetenido: Date;
  fechaFin: Date;
  //====PROPIEDADES DE LAS OBSERVACIONES DEL MANTENIMIENTO==========================//
  form: FormGroup;
  formSubmit: boolean;
  

  constructor(
    private _mantenimientoService : MantenimientoService,
    private _solicitudService : SolicitudService,
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
    
    this._mantenimientoService.encontrarUnMantenimiento(this.idMtto)
      .subscribe((datos:any)=>{
        console.log(datos);
        this.tareas = datos.mantenimiento.tareas;
        this.mantenimiento = datos.mantenimiento;
        this.mantEstado = datos.mantenimiento.estado;
        
        

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
        this.estadomtto = datos.mantenimiento.estado;
        this.obsEstado = datos.mantenimiento.obsEstado;
        this.fechaInicio = datos.mantenimiento.fechaInicio;
        this.fechaDetenido = datos.mantenimiento.fechaDetenido;
        this.fechaFin = datos.mantenimiento.fechaFin;   
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
        this.listarUnMantenimiento(); 
      })
  }
  //==============================COMPLETAR ACTIVIDAD / TAREA =============================================//
  actualizarEstadoyDatosdelaTarea(tarea, index){
    this._mantenimientoService.actualizarEstadodeTareasdeValvulas(tarea, this.idMtto, index)
      .subscribe((datos:any)=>{
        console.log(datos);

        this._mantenimientoService.actualizarEstadoActividades(this.mantenimiento, this.idMtto)
        .subscribe((datos:any)=>{
          console.log(datos);
          this.listarUnMantenimiento();
        })   
    })
  }
  //======ACTUALIZAR EL ESTADO DEL MANTENIMIENTO Y SI ESTA CERRADA ACTUALIZAR EL ESTADO DE LA SOLICITUD=====//
  ActualizarEstadoMtto(){
    let elestadosi = this.mantEstado.toString();

    this.mantenimiento.estado = elestadosi;

    this.mantenimiento.obsEstado = this.obsEstado;
    //=====================SI TODAS LAS ACTIVIDADES SE COMPLETAN SE PUEDE COMPLETAR EL MANTENIMIENTO=======//
    if(this.mantenimiento.estadoactividades == true){
      this._mantenimientoService.actualizarEstadoMtto(this.mantenimiento, this.idMtto)
      .subscribe((datos:any)=>{
        console.log(datos);
        var idSolicitud = datos.mttoActualizado.solicitud;
        //=======SI EL MTTO SE COMPLETA CONSULTO SI OTROS MTTOS DE LA SOLICITUD ESTAN EN ESTADO COMPLETADO==============//
        if(datos.mttoActualizado.estado == "COMPLETADO"){
          this._mantenimientoService.mttosCompletos(datos.mttoActualizado.solicitud)
            .subscribe((datos:any)=>{
              console.log(datos);
              this.listarUnMantenimiento();
              //si todos estan completos
              if(datos.completo==true){
                this._mantenimientoService.traelaSolicituddelMantenimiento(idSolicitud)
                  .subscribe((datos:any)=>{
                    datos.solicitud.estado = 'COMPLETADA'
                    //actualizando el estado de la solicitud
                    this._solicitudService.actualizarSolicitud(datos.solicitud._id, datos.solicitud)
                      .subscribe((datos:any)=>{
                        console.log(datos);
                        this.listarUnMantenimiento();
                      })
                  })
              }
            });
        }
      });
    }else{
      swal('Error', 'Faltan Actividades por Realizar', 'error');
    }

    if(this.mantenimiento.estadoactividades == false && this.mantenimiento.estado !='COMPLETADO' ){
      this._mantenimientoService.actualizarEstadoMtto(this.mantenimiento, this.idMtto)
      .subscribe((datos:any)=>{
        console.log(datos);
        this.listarUnMantenimiento();
      });
    }else{
      swal('Error', 'Faltan Actividades por Realizar', 'error');
    }
  }

}
