import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu : any = [
    {
      titulo: "Principal",
      icono: "mdi mdi-gauge",
      submenu:[
        { titulo:"Dashboard", url:"/dashboard" },
        { titulo:"ProgressBar", url:"/progress" },
        { titulo:"Grafica1", url:"/graficas1" },
        { titulo:"Grafica2", url:"/graficas2" },
        { titulo:"Promesas", url:"/promesas" },
        { titulo:"RXJS", url:"/rxjs" }
      ]
    },
    {
      titulo: "Mantenimientos",
      icono: "mdi mdi-folder-lock-open",
      submenu:[
        {titulo:"Usuarios", url:'/usuarios'},
        {titulo:"Solicitudes", url:'/solicitudes'}
      ]

    },
    {
      titulo:"Configuraciones",
      icono:"mdi mdi-wrench",
      submenu:[
        {titulo:"Tipos Mtto", url:"/tipomtto"},
        {titulo:"Tareas", url:"/tarea"}
      ]
    }
  ];

  constructor() { }
}
