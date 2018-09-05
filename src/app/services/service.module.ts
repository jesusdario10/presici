import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsService,
         SidebarService,
         SharedService,
         UsuarioService,
         LoginGuardGuard,
         SubirArchivoService,
         HospitalService,
         MedicoService,
         ItemService,
         TipomttoService,
         TareaService,
         ClienteService,
         CargosService,
         AdminGuard} from './service.index';
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
              HospitalService,
              MedicoService,
              ItemService,
              TipomttoService,
              TareaService,
              ClienteService,
              CargosService
              ],
  declarations: [],
  
})
export class ServiceModule { }
