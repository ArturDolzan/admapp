import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { SnackbarComponent } from './messages/snackbar/snackbar.component';
import { RadioComponent } from './radio/radio.component';
import { LinkAtivoInativoComponent } from './link-ativo-inativo/link-ativo-inativo.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NotificationService } from './messages/notification.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatSortModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatIconModule, MatProgressSpinnerModule, MatAutocompleteModule, MatButtonModule } from '@angular/material';
import { ConfirmacaoComponent } from './messages/confirmacao/confirmacao.component';
import { AutolistComponent } from './autolist/autolist.component';
import { ListfilterComponent } from './listfilter/listfilter.component';
import { BotaonovolistarComponent } from './botaonovolistar/botaonovolistar.component';
import { BotoescadastroComponent } from './botoescadastro/botoescadastro.component';
import { ChatComponent } from '../mensageria/chat/chat.component';

@NgModule({
  declarations: [InputComponent, SnackbarComponent, RadioComponent, LinkAtivoInativoComponent, ConfirmacaoComponent, AutolistComponent, ListfilterComponent, BotaonovolistarComponent, BotoescadastroComponent, ChatComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  exports: [
    InputComponent, 
    SnackbarComponent,
    ConfirmacaoComponent, 
    RadioComponent, 
    LinkAtivoInativoComponent, 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule,
    AutolistComponent,
    ListfilterComponent,
    BotaonovolistarComponent,
    BotoescadastroComponent,
    ChatComponent
  ]
})
export class SharedModule { 
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers:[NotificationService]
    }
  }
}
