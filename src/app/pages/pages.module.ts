import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';


//ng2-charts
import { ChartsModule } from 'ng2-charts';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { GraficoRadarComponent } from '../components/grafico-radar/grafico-radar.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { ItemComponent } from './item/item.component';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { ClienteComponent } from './cliente/cliente.component';
import { CargosComponent } from './cargos/cargos.component';
import { EditCargosComponent } from './cargos/edit-cargos/edit-cargos.component';
import { ValvulasComponent } from './valvulas/valvulas.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { OrdenesAceptacionComponent } from './ordenes-aceptacion/ordenes-aceptacion.component';
import { OrdenesGestionComponent } from './ordenes-gestion/ordenes-gestion.component';
import { CotizacionComponent } from './cotizacion/cotizacion.component';
import { MantenimientosComponent } from './mantenimientos/mantenimientos.component';







@NgModule({
    declarations:[
        DashboardComponent,
        PagesComponent,      
        IncrementadorComponent,
        GraficoDonaComponent,
        GraficoRadarComponent,
        AccountSettingsComponent,
        ProfileComponent,
        UsuariosComponent,
        ModalUploadComponent,
        SolicitudesComponent,
        ItemComponent,
        
        
        OrdenesComponent,
        ClienteComponent,
        CargosComponent,
        EditCargosComponent,
        ValvulasComponent,
        ActividadesComponent,
        OrdenesAceptacionComponent,
        OrdenesGestionComponent,
        CotizacionComponent,
        MantenimientosComponent,
     
        
        
        
        
      
     
    ],
    exports:[
        DashboardComponent

    ],
    imports:[
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule,
        BrowserModule,
        ReactiveFormsModule
        
        
    ]
})
export class PageModule{}