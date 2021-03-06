import {Routes} from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './settings/about/about.component';
import { MateriaisComponent } from './materiais/materiais.component';
import { CadastroMateriaisComponent } from './materiais/cadastro-materiais/cadastro-materiais.component';
import { ConfiguracoesComponent } from './settings/configuracoes/configuracoes.component';
import { UsuariosComponent } from './settings/configuracoes/usuarios/usuarios.component';
import { CadastroUsuariosComponent } from './settings/configuracoes/usuarios/cadastro-usuarios/cadastro-usuarios.component';
import { EstadosComponent } from './settings/configuracoes/estados/estados.component';
import { CadastroEstadosComponent } from './settings/configuracoes/estados/cadastro-estados/cadastro-estados.component';
import { CidadesComponent } from './settings/configuracoes/cidades/cidades.component';
import { CadastroCidadesComponent } from './settings/configuracoes/cidades/cadastro-cidades/cadastro-cidades.component';
import { ChatDirectComponent } from './mensageria/chat-direct/chat-direct.component';

export const ROUTES: Routes = [
  {path: '', component: DashboardComponent},
  {path:'about', component: AboutComponent},
  {path:'configuracoes', component: ConfiguracoesComponent},
  {path:'usuarios', component: UsuariosComponent},
  {path:'cadastro-usuarios/:Id', component: CadastroUsuariosComponent},
  {path:'estados', component: EstadosComponent},
  {path:'cadastro-estados/:Id', component: CadastroEstadosComponent},
  {path:'cidades', component: CidadesComponent},
  {path:'cadastro-cidades/:Id', component: CadastroCidadesComponent},
  {path:'materiais', component: MateriaisComponent},
  {path:'cadastro-materiais/:Id', component: CadastroMateriaisComponent},
  {path:'chat-direct/:ConectionId/:AppUser', component: ChatDirectComponent},
]