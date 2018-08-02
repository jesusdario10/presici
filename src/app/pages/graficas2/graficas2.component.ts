import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graficas2',
  templateUrl: './graficas2.component.html',
  styles: []
})
export class Graficas2Component implements OnInit {

  
  radar: any = {
    'radar1': {
      'labels': ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
      'data':  [
                {data: [65, 59, 90, 81, 56, 55, 40], label: 'Serie A'},
                {data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B'}
              ],
      'type': 'radar',
      'leyenda': 'El pan se come con'
    },
    'radar2': {
      'labels': ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
      'data':  [
                {data: [30, 10, 10, 30, 20, 30, 40], label: 'Serie A'},
                {data: [60, 88, 90, 5, 60, 40, 98], label: 'Series B'}
              ],
      'type': 'radar',
      'leyenda': 'El pan se come con'
    },
    'radar3': {
      'labels': ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
      'data':  [
                {data: [65, 59, 90, 81, 56, 55, 40], label: 'Serie A'},
                {data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B'}
              ],
      'type': 'radar',
      'leyenda': 'El pan se come con'
    },
    'radar4': {
      'labels': ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
      'data':  [
                {data: [65, 59, 90, 81, 56, 55, 40], label: 'Serie A'},
                {data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B'}
              ],
      'type': 'radar',
      'leyenda': 'El pan se come con'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
