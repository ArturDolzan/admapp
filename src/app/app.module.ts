import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';


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
import { MatTableModule, MatSortModule, MatPaginator, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatDialogContent, MatDialogModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import { MateriaisComponent } from './materiais/materiais.component';
import { HttpClientModule } from '@angular/common/http';
import { CadastroMateriaisComponent } from './materiais/cadastro-materiais/cadastro-materiais.component';
import { InputComponent } from './shared/input/input.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    MenuSearchComponent,
    MateriaisComponent,
    CadastroMateriaisComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    MatTableModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    HttpModule,
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    AgGridModule.withComponents(null)
  ],
  entryComponents:[
    CadastroMateriaisComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
