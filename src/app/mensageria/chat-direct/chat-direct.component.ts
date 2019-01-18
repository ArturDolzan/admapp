import { Component, OnInit } from '@angular/core';
import { ChatDirect, EnumChatVisualizado } from './chat-direct.model';
import { ActivatedRoute } from '@angular/router';
import { ChatDirectService } from './chat-direct.service';
import { NotificationService } from '../../shared/messages/notification.service';

@Component({
  selector: 'app-chat-direct',
  templateUrl: './chat-direct.component.html',
  styleUrls: ['./chat-direct.component.css']
})
export class ChatDirectComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private chatDirectService: ChatDirectService,
              private notificationService: NotificationService) { }

  conectionId: string
  appUserDestino: string

  chatDirect: ChatDirect[] = [
    {
      UsuarioOrigem: 'Jaca',
      UsuarioDestino: 'AppNoAuth',
      DataHora: new Date(),
      Mensagem: 'Are you ok?',
      CaminhoFoto: 'assets/user2-160x160.jpg',
      Visualizado: EnumChatVisualizado.NaoVisualizado
    },
    {
      UsuarioOrigem: 'AppNoAuth',
      UsuarioDestino: 'Jaca',
      DataHora: new Date(),
      Mensagem: 'Yes',
      CaminhoFoto: 'assets/user2-160x160.jpg',
      Visualizado: EnumChatVisualizado.NaoVisualizado
    },
    {
      UsuarioOrigem: 'AppNoAuth',
      UsuarioDestino: 'Jaca',
      DataHora: new Date(),
      Mensagem: 'Muito yessssss',
      CaminhoFoto: 'assets/user2-160x160.jpg',
      Visualizado: EnumChatVisualizado.NaoVisualizado
    }
  ]

  ngOnInit() {
    this.conectionId = this.route.snapshot.params['ConectionId']
    this.appUserDestino = this.route.snapshot.params['AppUser']

    this.recuperarChat()    
  }

  recuperarChat(){
    this.chatDirectService.recuperarChat(this.chatDirectService.recuperarUsuarioLogado(), this.appUserDestino)
    .subscribe( conteudo=> this.cbRecuperarChat(conteudo), error => {
      
      this.notificationService.notify(JSON.parse(error._body).Mensagem)
    })
  }

  cbRecuperarChat(conteudo){
    this.chatDirect = conteudo.Dados
  }

  posicionarDireita(chat) {
    return chat.UsuarioOrigem === this.chatDirectService.recuperarUsuarioLogado()
  }

  posicionarEsquerda(chat) {
    return chat.UsuarioDestino === this.appUserDestino
  }

}
