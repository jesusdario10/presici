import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { Graficas2Component } from './graficas2/graficas2.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component'
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { ItemComponent } from './item/item.component';
import { TipomttoComponent } from './tipomtto/tipomtto.component';
import { TareaComponent } from './tarea/tarea.component';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { GestionItemComponent } from './item/gestion-item/gestion-item.component';



const pageRoutes : Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate:[LoginGuardGuard],
        children:[
            {path: 'dashboard', component: DashboardComponent, data:{titulo:'Dashboard'}},
            {path: 'progress', component: ProgressComponent, data:{titulo:'Progress'}},
            {path: 'graficas1', component: Graficas1Component, data:{titulo:'GradicasTorta'}},
            {path: 'graficas2', component: Graficas2Component, data:{titulo:'GraficasAraña'}},
            {path: 'promesas', component: PromesasComponent, data:{titulo:'Promesas'}},
            {path: 'rxjs', component: RxjsComponent, data:{titulo:'Rxjs'}},
            {path: 'account-settings', component: AccountSettingsComponent, data:{titulo:'Ajustes del Tema'} },
            {path: 'perfil', component: ProfileComponent, data:{titulo:'Perfil de usuario'}},
            //Mantenimientos
            {path: 'usuarios', component: UsuariosComponent, data:{titulo:'Mantenimiento de Usuario'}},
            {path: 'hospitales', component: HospitalesComponent, data:{titulo:'Mantenimiento de Hospitales'}},
            {path: 'medicos', component: MedicosComponent, data:{titulo:'Mantenimiento de Medicos'}},
            {path: 'medico/:id', component: MedicoComponent, data:{titulo:'Mantenimiento de Medicos'}},
            {path: 'solicitudes', component: SolicitudesComponent, data:{titulo:'Creacion de Solicitudes'}},
            {path: 'solicitudes/:id', component: ItemComponent, data:{titulo:'Agregar Item'}},
            {path: 'gestionitem/:id/:id2', component: GestionItemComponent, data:{titulo:'Gestionar Items'}},
            
            {path: 'tarea', component: TareaComponent, data:{titulo:'Administrador de Tareas'}},
            {path: 'tipomtto', component: TipomttoComponent, data:{titulo:'Administrador de Mantenimiento'}},
            {path: 'ordenes', component: OrdenesComponent, data:{titulo:'Administrador de Ordenes'}},
            
        

            {path: '', redirectTo: '/dashboard', pathMatch:'full'}
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pageRoutes)