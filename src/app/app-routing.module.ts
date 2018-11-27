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

export const ROUTES: Routes = [
  {path: '', component: DashboardComponent},
  {path:'about', component: AboutComponent}
]