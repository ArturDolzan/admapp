import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import { MateriaisComponent } from './materiais/materiais.component';
import { HttpClientModule } from '@angular/common/http';
import { CadastroMateriaisComponent } from './materiais/cadastro-materiais/cadastro-materiais.component';
import { SharedModule } from './shared/shared.module';
import { ConfiguracoesComponent } from './settings/configuracoes/configuracoes.component';
import { UsuariosComponent } from './settings/configuracoes/usuarios/usuarios.component';
import { CadastroUsuariosComponent } from './settings/configuracoes/usuarios/cadastro-usuarios/cadastro-usuarios.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { EstadosComponent } from './settings/configuracoes/estados/estados.component';
import { CadastroEstadosComponent } from './settings/configuracoes/estados/cadastro-estados/cadastro-estados.component';

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
    ConfiguracoesComponent,
    UsuariosComponent,
    CadastroUsuariosComponent,
    EstadosComponent,
    CadastroEstadosComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    SharedModule.forRoot(),
    AgGridModule.withComponents(null)
  ],
  entryComponents:[
    CadastroMateriaisComponent
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})

export class AppModule {
  // constructor(private injector: Injector) 
  // {
  //   InjectorInstance = this.injector;
  // }
}
