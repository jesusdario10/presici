import {NgModule } from '@angular/core';

import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import {BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component'
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

@NgModule({
    declarations:[
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        NopagefoundComponent
    ],
    exports:[
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        NopagefoundComponent
    ]
})

export class SharedModule{ }