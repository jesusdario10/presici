import { Component, OnInit } from '@angular/core';
import { SolicitudModel, Atributo } from '../../models/solicitudModel';
import { MantenimientoModel } from '../../models/mantenimientoModel';
import { SolicitudService, ItemService, MantenimientoService } from '../../services/service.index';
import { FormsModule, FormGroup, Validators, FormBuilder, FormGroupDirective } from '@angular/forms'
import { Router } from '@angular/router';
import { OrdenesService } from '../../services/ordenes/ordenes.service';

@Component({
  selector: 'app-ordenes-gestion',
  templateUrl: './ordenes-gestion.component.html',
  styleUrls: ['./ordenes-gestion.component.css']
})
export class OrdenesGestionComponent implements OnInit {
  
  solicitud :SolicitudModel;
  mantenimientos : any[]=[];
  mantenimiento : MantenimientoModel;
  idSolicitud : string;
  generar : boolean = false;
  indiceParaSerial : number;
  idmtto : string;

  form: FormGroup;
  formSubmit: boolean;

  constructor(
    public _solicitudServices : SolicitudService,
    public _itemService : ItemService,
    public _ordenesServices : OrdenesService,
    public _mantenimientoServices : MantenimientoService,
    public _router : Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    //=========================Cargo funcion para obtener el Id de la solicitud==============================//
    this.obtenerIdSolicitud(); 
    //=========================Cargo funcion oara obtener mantenimientos=====================================//
    this.obtenerMantenimientos();
    //=========================inicializar el Formulario=====================================================//
    this.form = this.fb.group({
      serieValvula: ["", Validators.required ]
    });
  }
  //================funcion para obtener mantenimientos======================================================//
  obtenerMantenimientos(){
    this._ordenesServices.listarMantenimientos(this.idSolicitud)
      .subscribe((datos:any)=>{
        if(datos.mantenimientos.length > 0){
          this.mantenimientos = datos.mantenimientos;
          this.generar = true;
        }
        if(datos.mantenimientos.length == 0){
          this.generar = false;
        }       
      });
  }
  //=====================obtener el id de la solicitud que viene por la url==================================//
  obtenerIdSolicitud(){
    let urlActual = window.location.href;
    let extraer = urlActual.split('/');
    let solicitud = extraer[5];
    this.idSolicitud = solicitud;
    
  }
  //======================Generar los mantenimientos=========================================================//
  generandoMantenimientos(){
    let lasolicitud:SolicitudModel={
      estado : 'EJECUCION'
    }
    console.log("SE GENERARON NUEVOS MANTENIMIENTOS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    this._ordenesServices.enviandosolicitud(this.solicitud, this.idSolicitud)
      .subscribe((datos:any)=>{
        this.obtenerMantenimientos(); 
    });
    this._solicitudServices.actualizarSolicitud(this.idSolicitud, lasolicitud)
      .subscribe((datos:any)=>{
        this.obtenerMantenimientos()
    });
    this.obtenerMantenimientos()

  }
  //=====================obtener el index de la valvula elegida para actualizar el serial====================//
  obtenerIndexValvula(index, mtto){
    console.log(mtto);
    console.log(index);
    this.indiceParaSerial = index;
    this.idmtto = mtto;
    this.encontrarUnMantenimiento();
  }
  //======================BUSCAR MANTENIMIENTO POR ID=========================================================//
  encontrarUnMantenimiento(){
    this._mantenimientoServices.encontrarUnMantenimiento(this.idmtto)
      .subscribe((datos:any)=>{
        this.mantenimiento = datos.mantenimiento;
      })
  }
  //======================Guardar los seriales en cada valvula de una solicitud descompuesta==================//
  guardarSerie(formData: any, formDirective: FormGroupDirective){
    const formModel  = this.form.value;
    const serieSave : MantenimientoModel = {
      serie: formModel.serieValvula as string
    }
    this._mantenimientoServices.actualizarSerialValvula(serieSave, this.idmtto, this.indiceParaSerial)
      .subscribe((datos:any)=>{
        this.obtenerMantenimientos(); 
      })
      formData.reset();
  }
  //=======================Si no se le agrega el Serial a la valvula no permite continuar======================//
  noSerie(){
    swal('Error', 'Agregue el Serial', 'error');
    return false;
  }


}
