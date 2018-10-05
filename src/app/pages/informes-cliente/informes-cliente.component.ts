import { Component, OnInit } from '@angular/core';
import { SolicitudService } from '../../services/service.index';
import { SolicitudModel } from '../../models/solicitudModel';
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
  abiertas : number=0;
  cerradas : number=0;
  aceptadas : number=0;
  espera : number=0 ;
  ejecucion : number=0;
  completas : number=0;

  //CAPTURANDO LAS FECHAS PARA EL FILTRADO//
  fechaInicial : Date;
  fechaFinal : Date;

   /*GRAFICO DE DONAS*/
  public doughnutChartLabels:string[] = ['Abiertas', 'Cerradas',  'Aceptadas', 'Espera', 'Completas'];
  public doughnutChartData:number[];
  public doughnutChartType:string = 'doughnut';

 
  


  constructor(
    private _solicitudService : SolicitudService
  ) { 
    this.doughnutChartData =  [this.abiertas, this.cerradas, this.aceptadas, this.espera, this.completas  ]
  }

  ngOnInit() {
    this.listarSolicitudes();
    this.generarGrafico();
  }
  /*CAPTURAR LAS FECHAS*/
  fechas(){
    console.log(this.fechaInicial);
    console.log(this.fechaFinal);
  }
  /*LISTAR LAS SOLICITUDES*/
  listarSolicitudes(){
    this._solicitudService.cargarSolicitudes2()
      .subscribe((datos:any)=>{
        console.log(datos);
        this.solicitudes = datos;

        //generar lso contadores para el grafico
        for(var i = 0 ; i<datos.length; i++){
          if(datos[i].estado == 'ACEPTADA'){
            this.aceptadas = this.aceptadas +1
          }
          if(datos[i].estado == 'CERRADA'){
            this.cerradas = this.cerradas +1
          }
          if(datos[i].estado == 'CREADA'){
            this.abiertas = this.abiertas +1
          }
        }
        console.log("aceptadas: "+ this.aceptadas);
        console.log("cerrada: "+ this.cerradas);
        console.log("creadas: "+ this.cerradas);
        this.doughnutChartData =  [this.abiertas, this.cerradas, this.aceptadas, 0, 1  ]
        
      })
  }
  generarGrafico(){
    console.log(this.solicitudes.length);
    var ctx = document.getElementById("elchart");
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [{
              label:['# of Votes','# of Votes'],
              data: [12, 19, 3, 5, 2, 3],

              borderColor: [
                  'rgba(255,99,132,1)',
                  
              ],
              pointBackgroundColor: 'rgba(255,150,0,0.5)',
              backgroundColor: 'transparent',

              borderWidth: 1
          },
          {
            label: ['# of yeah'],
            data: [15, 13, 18, 10, 4, 20],

            borderColor: [
              'rgba( 215, 44, 255, 0.9 )',
              

                
            ],
            borderWidth: 1
        },
          
        ]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
  });
   
  }


}
