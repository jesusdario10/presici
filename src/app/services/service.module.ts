import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsService,
         SidebarService,
         SharedService,
         UsuarioService,
         LoginGuardGuard,
         SubirArchivoService,
         ItemService,
         ClienteService,
         CargosService,
         AdminGuard,
         ValvulasService,
         ActividadesService,
         MantenimientoService, 
         InformesClienteService} from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [SettingsService,
              SidebarService,
              SharedService,
              LoginGuardGuard,
              AdminGuard,
              UsuarioService,
              SubirArchivoService,
              ModalUploadService,
              ItemService,
              ClienteService,
              CargosService,
              ValvulasService,
              ActividadesService,
              MantenimientoService,
              InformesClienteService
              ],
  declarations: [],
  
})
export class ServiceModule { }
