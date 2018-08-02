import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {
  public progreso1 : number = 0;
  public progreso2 : number = 30;
  ngOnInit() {
  }
  /*actualizar(event:number){
    console.log("evento: ", event);
    this.progreso1 = event;
  }*/
 
}
