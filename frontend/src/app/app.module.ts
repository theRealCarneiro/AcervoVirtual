import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

import { fab } from '@fortawesome/free-brands-svg-icons';


import { AuthGuard } from './_helpers/auth.guard';
import { AuthInterceptor } from './_helpers/auth-interceptor';
import { AcervoComponent, MngAcervoDialog } from './acervo/acervo.component';
import { AdminComponent, MngAdminDialog } from './admin/admin.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    AcervoComponent,
    AdminComponent,
    MngAcervoDialog,
    MngAdminDialog,
    InicioComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule, 
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    MatTooltipModule,
		MatCardModule,

    FormsModule,
    FontAwesomeModule,
  ],
  entryComponents:[
    MatDialogModule
  ],
  providers: [AuthGuard,
		{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
