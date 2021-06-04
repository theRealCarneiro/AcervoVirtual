import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcervoComponent } from './acervo/acervo.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {path: 'acervo', component: AcervoComponent},
  {path: 'admin', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
