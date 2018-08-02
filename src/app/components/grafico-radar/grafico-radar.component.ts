import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-radar',
  templateUrl: './grafico-radar.component.html',
  styles: []
})
export class GraficoRadarComponent implements OnInit {

    // Radar
    @Input() radarChartLabels:string[] = [];
 
    @Input() radarChartData:any = [
      {data: [], label: ''},
      {data: [], label: ''}
    ];
    @Input() radarChartType:string = 'radar';

   

  constructor() { }

  ngOnInit() {
  }

}
