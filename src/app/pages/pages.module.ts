
import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// ng2-charts
import { ChartsModule } from 'ng2-charts';

import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';

import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ClientesComponent } from './clientes/clientes.component';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator/paginator.component';
import { PerfilComponent } from './perfil/perfil.component';
import { MaterialModule } from './material';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatListModule, MatIconModule, MatToolbarModule, MatSidenavModule } from '@angular/material';
import { DataTableComponent } from './data-table/data-table.component';
import { DetalleFacturaComponent } from './factura/detalle-factura.component';
import { FacturasComponent } from './facturas/facturas.component';
import { NewclientComponent } from './newclient/newclient.component';
import { FormClienteComponent } from './form-cliente/formcliente.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        PromesasComponent,
        RxjsComponent,
        ClientesComponent,
        PaginatorComponent,
        PerfilComponent,
        DataTableComponent,
        DetalleFacturaComponent,
        FacturasComponent,
        NewclientComponent,
        FormClienteComponent
    ],
    exports: [
        DashboardComponent,
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        CommonModule,
        MatToolbarModule,
        MatSidenavModule,
        MaterialModule,
        MatIconModule,
        MatListModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        ReactiveFormsModule
    ]
})
export class PagesModule { }
