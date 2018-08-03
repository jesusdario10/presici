import { Component, OnInit } from '@angular/core';
import { resolve, reject } from '../../../../node_modules/@types/q';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    this.contar3().then(
     mensaje => console.log("Termino", mensaje)
    ).
    catch(error => console.error('Error en la promesa', error))

  }
  contar3(): Promise<boolean>{
    let contador = 0;
    return new Promise((resolve, reject)=>{
      let intervalo = setInterval(()=>{
        contador+=1;
        console.log(contador);

        if(contador==3){
          resolve(true);
          clearInterval(intervalo);
        }
      },1000);
    });
  }

  ngOnInit() {
  }

}
