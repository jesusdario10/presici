import { Component, OnInit } from '@angular/core';
import { InformesClienteService, MantenimientoService } from '../../services/service.index';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective } from '@angular/forms';
import { SolicitudModel } from '../../models/solicitudModel';
import { MantenimientoModel } from '../../models/mantenimientoModel';
import Chart from 'chart.js';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-informes-linea',
  templateUrl: './informes-linea.component.html',
  styleUrls: ['./informes-linea.component.css']
})
export class InformesLineaComponent implements OnInit {
  mantenimientos : MantenimientoModel[]=[];
  fechaslinea : any[]=[];
  manEjecucion : any[]=[];
  manDetenido: any[]=[];
  manCompletados: any[]=[];
  mancantidad : any;
  form: FormGroup;
  formSubmit: boolean;
  cliente : any;

  //CAPTURANDO LAS FECHAS PARA EL FILTRADO//
  fechaInicialForm : string;
  fechaFinalForm : string;

  constructor(

    private _informeClienteService : InformesClienteService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      fechaInicialForm :['', Validators.required],
      fechaFinalForm :['', Validators.required],
     });
    //Extrayendo el cliente
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    this.cliente = usuario.cliente;     
  }
  graficoLinea(formData: any, formDirective: FormGroupDirective){
    var formModel  = this.form.value;
    let fechas : SolicitudModel = {
      fechaInicial : formModel.fechaInicialForm as string,
      fechaFinal : formModel.fechaFinalForm as string,
      cliente : this.cliente
    }
    this._informeClienteService.mantenimientosClienteLinea(fechas)
    .subscribe((datos:any)=>{
      console.log(datos);
      this.mantenimientos = datos.mantenimientos;
      this.fechaslinea = datos.fechas;
      this.manEjecucion = datos.ejecucion;
      this.manDetenido = datos.detenidos;
      this.manCompletados = datos.completos;
      this.mancantidad = datos.contMantenimientos;

      
      console.log(this.fechaslinea)
  
        var ctx = document.getElementById("elchart");
        var myChart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: this.fechaslinea,
              datasets: [{
                  label:['Ejecucion'],
                  data: this.manEjecucion,
                  borderColor: [
                      'rgba(255,99,132,1)',      
                  ],
                  pointBackgroundColor: 'rgba(255,150,0,0.5)',
                  backgroundColor: 'transparent',
                  borderWidth: 1
              },
              {
                label: ['Detenidos'],
                data: this.manDetenido,
                borderColor: [
                  'rgba( 215, 44, 255, 0.9 )',  
                ],
                borderWidth: 1,
                backgroundColor: 'transparent',
                pointBackgroundColor: 'rgba( 215, 44, 255, 0.9 )', 
              },
              {
                label: ['Completos'],
                data: this.manCompletados,
                borderColor: [
                  'rgba(0, 0, 255, 0.6)',  
                ],
                borderWidth: 1,
                backgroundColor: 'transparent',
                pointBackgroundColor: 'rgba(0, 0, 255, 0.6)', 
              },
            ]
          }

      });
    })
  }

}
