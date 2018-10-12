import { Component, OnInit } from '@angular/core';
import { SolicitudService, MantenimientoService } from '../../services/service.index';
import { SolicitudModel } from '../../models/solicitudModel';
import { MantenimientoModel } from '../../models/mantenimientoModel';
import Chart from 'chart.js';

declare var jQuery:any;
declare var $:any;


@Component({
  selector: 'app-informes-cliente',
  templateUrl: './informes-cliente.component.html',
  styleUrls: ['./informes-cliente.component.css']
})
export class InformesClienteComponent implements OnInit {
  solicitudes : SolicitudModel[]=[];
  cantidad : number;
  mancantidad : number;
  solicitud : SolicitudModel;
  abiertas : number=0;
  cerradas : number=0;
  aceptadas : number=0;
  espera : number=0;
  ejecucion : number=0;
  completas : number=0;
  fechaslinea : any[]=[];
  manEjecucion : any[]=[];
  manDetenido: any[]=[];
  manCompletados: any[]=[];


  //CAPTURANDO LAS FECHAS PARA EL FILTRADO//
  fechaInicialForm : string;
  fechaFinalForm : string;

   /*GRAFICO DE DONAS*/
  public doughnutChartLabels:string[] = ['Abiertas', 'Cerradas',  'Aceptadas', 'Espera', 'Ejecucion', 'Completas'];
  public doughnutChartData:number[];
  //public doughnutChartType:string = 'polarArea';
  public doughnutChartType:string = 'doughnut';

 
  constructor(
    private _solicitudService : SolicitudService,
    private _mantenimientoService : MantenimientoService
  ) { 
    this.doughnutChartData =  [this.abiertas, this.cerradas, this.aceptadas, this.espera, this.ejecucion, this.completas ]
  }

  ngOnInit() {
   
  }
  /*CAPTURAR LAS FECHAS*/
  fechas(){
    console.log(this.fechaInicialForm);
    console.log(this.fechaFinalForm);
  }
  /*FUNCION DINAMICA GRAFICO DONAS*/
  generaGraficoDona(){
    let fechas : SolicitudModel = {
      fechaInicial : this.fechaInicialForm,
      fechaFinal : this.fechaFinalForm
    }
    this._solicitudService.buscarSolicitudesporfecha(fechas)
    .subscribe((datos:any)=>{
      console.log(datos.solicitudes.length);
      //inicializamos los contadores de los graficos
      this.abiertas=0;
      this.cerradas=0;
      this.aceptadas=0;
      this.espera=0;
      this.ejecucion=0;
      this.completas=0;
      this.cantidad = datos.cantidad;

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
        if(datos.solicitudes[i].estado == 'ESPERA'){
          this.espera = this.espera +1
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
      this.doughnutChartData =  [this.abiertas, this.cerradas, this.aceptadas, this.espera, this.ejecucion, this.completas ]
      
    })
    this._mantenimientoService.mttosEntreFechas(fechas)
      .subscribe((datos:any)=>{
        console.log(datos);
        this.fechaslinea = datos.fechas;
        this.manEjecucion = datos.ejecucion;
        this.manDetenido = datos.detenidos;
        this.manCompletados = datos.completos;
        this.mancantidad = datos.contMantenimientos;

        console.log(this.solicitudes.length);
        console.log(this.fechaslinea)
    
          var ctx = document.getElementById("elchart");
          var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.fechaslinea,
                datasets: [{
                    label:['EJECUCION'],
                    data: this.manEjecucion,
                    borderColor: [
                        'rgba(255,99,132,1)',      
                    ],
                    pointBackgroundColor: 'rgba(255,150,0,0.5)',
                    backgroundColor: 'transparent',
                    borderWidth: 1
                },
                {
                  label: ['DETENIDOS'],
                  data: this.manDetenido,
                  borderColor: [
                    'rgba( 215, 44, 255, 0.9 )',  
                  ],
                  borderWidth: 1,
                  backgroundColor: 'transparent',
                  pointBackgroundColor: 'rgba( 215, 44, 255, 0.9 )', 
                },
                {
                  label: ['COMPLETOS'],
                  data: this.manCompletados,
                  borderColor: [
                    'rgba(0, 0, 255, 0.6)',  
                  ],
                  borderWidth: 1,
                  backgroundColor: 'transparent',
                  pointBackgroundColor: 'rgba(0, 0, 255, 0.6)', 
                },
              ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                     
                        }
                    }],
 
                }
            }
        });
      })
  }

  //==================GRAFICO DE BARRAS======================== //


  generarGrafico(){

   
  }


}
