import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SettingsComponent } from './settings/settings.component';
import { MenuComponent } from './menu/menu.component';
import { GeneralComponent } from './settings/general/general.component';
import { HomeComponent } from './settings/home/home.component';
import { MessagesComponent } from './header/messages/messages.component';
import { NotificationsComponent } from './header/notifications/notifications.component';
import { TasksComponent } from './header/tasks/tasks.component';
import { UserLoginComponent } from './header/user-login/user-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import {ROUTES} from './app-routing.module';
import { AboutComponent } from './settings/about/about.component';
import { MenuSearchComponent } from './menu/menu-search/menu-search.component'
import { MatTableModule, MatSortModule, MatPaginator, MatPaginatorModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SettingsComponent,
    MenuComponent,
    GeneralComponent,
    HomeComponent,
    MessagesComponent,
    NotificationsComponent,
    TasksComponent,
    UserLoginComponent,
    DashboardComponent,
    AboutComponent,
    MenuSearchComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    MatTableModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
