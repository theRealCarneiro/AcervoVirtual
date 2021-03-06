import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './_helpers/auth.guard';
import { AuthInterceptor } from './_helpers/auth-interceptor';
import { AcervoComponent } from './acervo/acervo.component';
import { AdminComponent } from './admin/admin.component';
import { InicioComponent } from './inicio/inicio.component';
import { ContatoComponent } from './contato/contato.component';
import { LoginComponent } from './login/login.component';
import { MngAdminDialogComponent, MngAcervoDialogComponent, FiltroDialogComponent } from './dialogs/dialogs.component';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
	declarations: [
		AppComponent,
		AcervoComponent,
		AdminComponent,
		FiltroDialogComponent,
		MngAcervoDialogComponent,
		MngAdminDialogComponent,
		InicioComponent,
		ContatoComponent,
		LoginComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		FlexLayoutModule,
		YouTubePlayerModule,

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
		MatIconModule,
		MatSidenavModule,

		FormsModule,
		FontAwesomeModule,
	],
	entryComponents: [
		MatDialogModule
	],
	providers: [
		AuthGuard,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
