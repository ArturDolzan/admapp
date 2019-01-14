import { Component, OnInit } from '@angular/core';
import { Chat, EnumTipoChat } from './chat.model';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  chatUsuarioLogado: Chat[] = [
    {
      IdUsuario: 1,
      NomeUsuario: 'Tuca',
      CaminhoFoto: 'assets/user2-160x160.jpg',
      DataHora: new Date(),
      Mensagem: 'Que nada =/',
      TipoChat: EnumTipoChat.UsuarioLogado
    }
  ]

  chatOutrosUsuarios: Chat[] = [
    {
      IdUsuario: 2,
      NomeUsuario: 'Jaca',
      CaminhoFoto: 'assets/user2-160x160.jpg',
      DataHora: new Date(),
      Mensagem: 'Ta pronto??',
      TipoChat: EnumTipoChat.OutroUsuario
    }
  ]

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    
  }

}
