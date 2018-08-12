import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsService,
         SidebarService,
         SharedService,
         UsuarioService,
         LoginGuardGuard,
         SubirArchivoService } from './service.index';
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
              UsuarioService,
              SubirArchivoService,
              ModalUploadService],
  declarations: []
})
export class ServiceModule { }