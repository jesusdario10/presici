import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, FormGroup, Validators, FormBuilder, FormGroupDirective } from '@angular/forms'

@Component({
  selector: 'app-informes-cliente',
  templateUrl: './informes-cliente.component.html',
  styleUrls: ['./informes-cliente.component.css']
})
export class InformesClienteComponent implements OnInit {
  cliente : any;

  constructor() { }
  //Donus
  public doughnutChartLabels:string[] = ['Abiertas', 'Cerradas', 'Completas'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';

  // lineChart
  public lineChartData:Array<any> = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartType:string = 'line';
  public pieChartType:string = 'pie';
  

  ngOnInit() {

    

  }
  redireccionar(){
    console.log("vamos por aqui");
  }

}
