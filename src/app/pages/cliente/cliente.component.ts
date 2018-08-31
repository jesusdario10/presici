import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/service.index';
import { ClienteModel } from '../../models/clienteModel';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { stringify } from '@angular/core/src/util';

declare var swal:any;

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  clientes: ClienteModel[]=[];
  datosCliente: ClienteModel[]=[];
  datosCliente2: ClienteModel;
  idCliente : string;
  form: FormGroup;
  form2: FormGroup;
  formSubmit: boolean;

  constructor(
    private _clienteService:ClienteService,
    private _route : ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.listarClientes();
    this.form = this.fb.group({
      nombreC: [ "", Validators.required ],
      nitC: [ "", Validators.required ],
      correoC: [ "", Validators.required ],
      direccionC: [ "", Validators.required ],
      telefonoC: [ "", Validators.required ],
      celular1C: [ "", Validators.required ],
      celular2C: [ "", Validators.required ],
      contactoC: [ "", Validators.required ],
      dificultadC: [ "", Validators.required ]

    });
  }
  
  //******************LISTAR CLIENTES*********************** */
  listarClientes(){
    this._clienteService.listarClientes()
      .subscribe((datos:any)=>{
        console.log("esto es desde el componente");
        this.clientes = datos.clientes;
      });
  }
  //*********************MOSTRAR DATOS*********************** */
  mostrarDatos(id){
    console.log(id);
    this._clienteService.listarUnSoloCliente(id)
      .subscribe((datos:any)=>{
        console.log("en el componente");
        console.log(datos);
        this.datosCliente = datos.cliente;
        this.datosCliente2 = datos.cliente;
        console.log("inspeccionando lo que me trae datos");
        console.log(this.datosCliente2.nombre);
        
      })
  }
  //*********************CREAR CLIENTE***************** */
  crearClienteL(formData: any, formDirective: FormGroupDirective){
    const formModel  = this.form.value;
    let saveCliente: ClienteModel = {
      
        nombre :formModel.nombreC as string,
        nit :formModel.nitC as string,
        email :formModel.correoC as string,
        direccion :formModel.direccionC as string,
        telefono :formModel.telefonoC as string,
        celular1 :formModel.celular1C as string,
        celular2 :formModel.celular2C as string,
        contacto :formModel.contactoC as string
        
    };
    this._clienteService.crearCliente(saveCliente)
      .subscribe(datos=>{
        
      })
      let intervalo = setTimeout(() => {
        this.listarClientes();
      }, 200);
  }
  //*********************ACTUALIZAR CLIENTE***************** */
  editarClienteL (formData: any, formDirective: FormGroupDirective){
    const formModel  = this.form.value;
    let updateCliente: ClienteModel = {
      nombre :formModel.nombreC as string,
      nit :formModel.nitC as string,
      email :formModel.correoC as string,
      direccion :formModel.direccionC as string,
      telefono :formModel.telefonoC as string,
      celular1 :formModel.celular1C as string,
      celular2 :formModel.celular2C as string,
      contacto :formModel.contactoC as string
      
  };
    this._clienteService.editarCliente(updateCliente, this.datosCliente2[0]._id)
      .subscribe((datos:any)=>{
        console.log("cliente actualizado");
        console.log(datos);
      })
      let intervalo = setTimeout(() => {
        this.listarClientes();
      }, 200);
      
  }
  //*********************BUSCAR CLIENTE***************** */
  buscarCliente(termino:string){
    if(termino.length<=0){
      this.listarClientes();
      return;
    }
    console.log(termino);
    
    this._clienteService.buscarCliente(termino)
        .subscribe((clientes:any)=>{
          this.clientes = clientes;
        });
  }
}
