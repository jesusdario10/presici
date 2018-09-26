import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';


import { AccountSettingsComponent } from './account-settings/account-settings.component'


/** Guards **/
import { LoginGuardGuard, AdminGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
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





const pageRoutes : Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate:[LoginGuardGuard],
        children:[
            {path: 'dashboard', component: DashboardComponent, data:{titulo:'Dashboard'}},
            /*{path: 'progress', component: ProgressComponent, data:{titulo:'Progress'}},
            {path: 'graficas1', component: Graficas1Component, data:{titulo:'GradicasTorta'}},
            {path: 'graficas2', component: Graficas2Component, data:{titulo:'GraficasAraña'}},
            {path: 'promesas', component: PromesasComponent, data:{titulo:'Promesas'}},
            {path: 'rxjs', component: RxjsComponent, data:{titulo:'Rxjs'}},*/
            {path: 'account-settings', component: AccountSettingsComponent, data:{titulo:'Ajustes del Tema'} },
            {path: 'perfil', component: ProfileComponent, data:{titulo:'Perfil de usuario'}},


            /* =================Creacion de solicitudes=====================*/
            
            /*{path: 'hospitales', component: HospitalesComponent, data:{titulo:'Mantenimiento de Hospitales'}},
            {path: 'medicos', component: MedicosComponent, data:{titulo:'Mantenimiento de Medicos'}},
            {path: 'medico/:id', component: MedicoComponent, data:{titulo:'Mantenimiento de Medicos'}},*/
            {path: 'solicitudes', component: SolicitudesComponent, data:{titulo:'Creacion de Solicitudes'}},
            {path: 'solicitudes/:id', component: ItemComponent, data:{titulo:'Agregar Item'}},
            {path: 'cotizacion/:id', component: CotizacionComponent, data:{titulo:'Cotizacion'}},
            

            /* =================Gestion de Ordenes===========================*/
            {
                path: 'aceptacion',
                component: OrdenesAceptacionComponent,
                canActivate:[AdminGuard],
                data:{titulo:'Aceptacion o Rechazo'},
            },
            {
                path: 'ordenes',
                component: OrdenesComponent,
                canActivate:[AdminGuard],
                data:{titulo:'Administrador de Ordenes'},
            },
            {
                path: 'gestionsolicitud/:id',
                component: OrdenesGestionComponent,
                canActivate:[AdminGuard],
                data:{titulo:'Equipos para Mantenimiento'},
            },
            {
                path: 'mantenimientos/:id',
                component: MantenimientosComponent,
                canActivate:[AdminGuard],
                data:{titulo:'Equipos para Mantenimiento'},
            },
            
            
            
            
             /* =================Configuraciones y Admin=====================*/
            {
                path: 'usuarios',
                component: UsuariosComponent,
                canActivate:[AdminGuard],
                data:{titulo:'Administrador de Usuarios'}
                
            },
            {
                path: 'clientes',
                component: ClienteComponent,
                canActivate:[AdminGuard],
                data:{titulo:'Administrador de Clientes'}},
            {
                path: 'cargos',
                component: CargosComponent,
                canActivate:[AdminGuard],
                data:{titulo:'Administrador de Cargos'}},
            {
                path: 'cargos/:id',
                component: EditCargosComponent,
                canActivate:[AdminGuard],
                data:{titulo:'Modificar Cargo'}
            },
            {
                path: 'valvulas',
                component: ValvulasComponent,
                canActivate:[AdminGuard],
                data:{titulo:'Valvulas'}
            },
            {
                path: 'valvulas/:id',
                component: ActividadesComponent,
                canActivate:[AdminGuard],
                data:{titulo:'Agregar Actividades'}
            },
            

            {path: '', redirectTo: '/dashboard', pathMatch:'full'},
            
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pageRoutes)