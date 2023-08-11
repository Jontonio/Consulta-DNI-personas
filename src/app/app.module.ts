import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
// ngx print
import {NgxPrintModule} from 'ngx-print';
import { TableHistorialComponent } from './components/table-historial/table-historial.component';
import { FormConsultaComponent } from './components/form-consulta/form-consulta.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    TableHistorialComponent,
    FormConsultaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxPrintModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
