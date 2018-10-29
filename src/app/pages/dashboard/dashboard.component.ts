import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  usuarioROLE : any;

  constructor() { }

  ngOnInit() {
      this.cargarRoleStorage();
  }

  cargarRoleStorage(){
    if(localStorage.getItem('token')){
      let usuario = JSON.parse(localStorage.getItem('usuario'));
      this.usuarioROLE = usuario.role;
      console.log(this.usuarioROLE);
    }
  }
}
