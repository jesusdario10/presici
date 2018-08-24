import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu : any = [
    {
      titulo: "Mantenimientos",
      icono: "mdi mdi-folder-lock-open",
      submenu:[
        { titulo:"Dashboard", url:"/dashboard" },
        {titulo:"Solicitudes", url:'/solicitudes'},
        {titulo:"Ordenes", url:'/ordenes'}

      ]

    },
    {
      titulo:"Configuraciones",
      icono:"mdi mdi-wrench",
      submenu:[
        {titulo:"Tipos Mtto", url:"/tipomtto"},
        {titulo:"Tareas", url:"/tarea"},
        {titulo:"Usuarios", url:'/usuarios'},
      ]
    }
  ];

  constructor() { }
}
