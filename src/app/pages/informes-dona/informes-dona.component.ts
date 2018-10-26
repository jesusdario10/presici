import { Component, OnInit } from '@angular/core';
import { SolicitudService, MantenimientoService, InformesClienteService } from '../../services/service.index';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective } from '@angular/forms';
import { SolicitudModel } from '../../models/solicitudModel';
import { MantenimientoModel } from '../../models/mantenimientoModel';
import Chart from 'chart.js';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-informes-dona',
  templateUrl: './informes-dona.component.html',
  styleUrls: ['./informes-dona.component.css']
})
export class InformesDonaComponent implements OnInit {
  mantenimientos : MantenimientoModel[]=[];
  solicitudes : SolicitudModel[]=[];
  cantidadS : any;
  mancantidadM : any;
  solicitud : SolicitudModel;
  abiertas : number=0;
  cerradas : number=0;
  aceptadas : number=0;
  espera : number=0;
  ejecucion : number=0;
  completas : number=0;
  
  manEjecucion : number=0;
  manDetenido: number=0;
  manCompletados: number=0;

  form: FormGroup;
  formSubmit: boolean;

  //deterninando que es un cliente y solo puede ver lo suyo
  cliente: any;


  //CAPTURANDO LAS FECHAS PARA EL FILTRADO//
  fechaInicialForm : string;
  fechaFinalForm : string;

   /*GRAFICO DE DONAS DE SOLICITUDES*/
   public doughnutChartLabels:string[] = ['Abiertas', 'Cerradas', 'Ejecucion', 'Aceptadas',  'Completas'];
   public doughnutChartData:number[];
   //public doughnutChartType:string = 'polarArea';
   public doughnutChartType:string = 'doughnut';  

   /*GRAFICO DE DONAS DE MANTENIMIENTOS*/
   public doughnutChartLabels2:string[] = ['Ejecucion', 'Detenido', 'Completado'];
   public doughnutChartData2:number[];
   //public doughnutChartType:string = 'polarArea';
   public doughnutChartType2:string = 'doughnut';     

  constructor(
    private _solicitudService : SolicitudService,
    private _mantenimientoService : MantenimientoService,
    private fb: FormBuilder,
    private _informeClienteDona : InformesClienteService
  ) {
    this.doughnutChartData =  [this.abiertas, this.cerradas, this.ejecucion, this.aceptadas, this.completas ]
    this.doughnutChartData2 = [this.manEjecucion, this.manDetenido, this.manCompletados];
   }

  ngOnInit() {
    this.form = this.fb.group({
      fechaInicialForm :['', Validators.required],
      fechaFinalForm :['', Validators.required],
     });
     //Extrayendo el cliente
     let usuario = JSON.parse(localStorage.getItem('usuario'));
     this.cliente = usuario.cliente;
     
  }
  /*FUNCION DINAMICA GRAFICO DONAS*/
  generarGraficos(formData: any, formDirective: FormGroupDirective){
    var formModel  = this.form.value;
    console.log(this.form.invalid);

    let fechas : SolicitudModel = {
      fechaInicial : formModel.fechaInicialForm as string,
      fechaFinal : formModel.fechaFinalForm as string,
      cliente :this.cliente
    }
    this._informeClienteDona.mantenimientoClienteDonaSolicitud(fechas)
    .subscribe((datos:any)=>{
      console.log(datos);
      this.cantidadS = datos.cantidad;
      this.solicitudes = datos.solicitudes;
      //inicializamos los contadores de los graficos
      this.abiertas=0;
      this.cerradas=0;
      this.aceptadas=0;
      this.espera=0;
      this.ejecucion=0;
      this.completas=0;
      

      for(var i = 0 ; i<datos.solicitudes.length; i++){
        if(datos.solicitudes[i].estado == 'CREADA'){
          this.abiertas = this.abiertas +1
        }
        if(datos.solicitudes[i].estado == 'CERRADA'){
          this.cerradas = this.cerradas +1
        }
        if(datos.solicitudes[i].estado == 'ACEPTADA'){
          this.aceptadas = this.aceptadas +1
        }
        if(datos.solicitudes[i].estado == 'EJECUCION'){
          this.ejecucion = this.ejecucion +1
        }
        if(datos.solicitudes[i].estado == 'COMPLETADA'){
          this.completas = this.completas +1
        }
      }
      console.log("abiertas: "+ this.abiertas);
      console.log("cerrada: "+ this.cerradas);
      console.log("aceptadas: "+ this.aceptadas);
      console.log("espera: "+ this.espera);
      console.log("ejecucion: "+ this.ejecucion);
      console.log("completas: "+ this.completas);
      this.doughnutChartData =  [this.abiertas, this.cerradas, this.ejecucion, this.aceptadas, this.completas ]

      this._informeClienteDona.mantenimientoClienteDona(fechas)
      .subscribe((datos:any)=>{
        this.mancantidadM = datos.contMantenimientos;
        this.mantenimientos = datos.mantenimientos;
        console.log(datos);
        this.manEjecucion=0;
        this.manDetenido=0;
        this.manCompletados=0;

        console.log(datos.mantenimientos.length);
        for(var j = 0; j < datos.mantenimientos.length; j++){
          if(datos.mantenimientos[j].estado == 'COMPLETADO'){
            this.manCompletados = this.manCompletados +1
          }
          if(datos.mantenimientos[j].estado == 'DETENIDO'){
            this.manDetenido = this.manDetenido +1
          }
          if(datos.mantenimientos[j].estado == 'EJECUCION'){
            this.manEjecucion = this.manEjecucion +1
          }
        }
        console.log(this.manCompletados, "los completados");
        console.log(this.manDetenido, "los que estan en detenidos");
        console.log(this.manCompletados, "los que estan ejecucion");
        this.doughnutChartData2 =  [this.manEjecucion, this.manDetenido, this.manCompletados]
        
        
      })
      
    })

  }  

}
