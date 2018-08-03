import { Component, OnInit } from '@angular/core';

import { Observable, Subscriber} from 'rxjs';
import { map, retry } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() { 
    this.regresaObservable()
    .subscribe(  
      numero=>  console.log("Subscripcion", numero),//este es cuando se recibe algo del next
      error => console.error("error en el obs", error),//esto nes cuando pasa un error
      ()=> console.log("el observador termino")//cuando el observable termina
    );
  }
  regresaObservable(): Observable<any>{
    let contador = 0;
    return new Observable( (observer: Subscriber<any>) =>{
      let intervalo = setInterval(()=>{
        observer.next(contador);
        contador++
        if(contador>3){
          clearInterval(intervalo);
          observer.complete();
        }
      },1000);
    });
    
  }
  ngOnInit() {
  }


}

