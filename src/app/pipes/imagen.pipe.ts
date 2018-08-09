import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    

    let url = URL_SERVICIOS+'/img';
    //si no viene imagen ejecuta la siguiente url
    if(!img){
      return url +'/usuarios/xxx';
    }
    //si viene un https es una imagen de google.
    if(img.indexOf('https')>=0){
      return img;
    }
    //pero sino es una imagende google
    switch(tipo){
      case 'usuario':
              url += '/usuarios/'+img
          break;
      case 'medico':
              url += '/medicos/'+img
          break;
      case 'hospital':
              url += '/hospitales/'+img
          break;

          default:
            console.log("el tipo no existe, debe ser usuario, medicos u hospitales.");
            return url +'/usuarios/xxx';
  
    }

    return url;
  }

}

