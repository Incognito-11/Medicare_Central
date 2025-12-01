import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { PageHeaderComponent } from './shared/components/page-header/page-header.component';
import { DoctorListComponent } from './doctors/components/doctor-list/doctor-list.component';
import { DoctorDetailsComponent } from './doctors/components/doctor-details/doctor-details.component';
import { AppointmentFormComponent } from './doctors/components/appointment-form/appointment-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageHeaderComponent,
    DoctorListComponent,
    DoctorDetailsComponent,
    AppointmentFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
