import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcervoComponent } from './acervo/acervo.component';
import { AdminComponent } from './admin/admin.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
	{path: '', component: InicioComponent, pathMatch: 'full'},
	{path: 'trabalhos', component: AcervoComponent},
	{path: 'login', component: LoginComponent},
	{path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
