// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';

// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }


import {Routes} from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './settings/about/about.component';
import { MateriaisComponent } from './materiais/materiais.component';
import { CadastroMateriaisComponent } from './materiais/cadastro-materiais/cadastro-materiais.component';

export const ROUTES: Routes = [
  {path: '', component: DashboardComponent},
  {path:'about', component: AboutComponent},
  {path:'materiais', component: MateriaisComponent},
  {path:'cadastro-materiais/:Id', component: CadastroMateriaisComponent}
]