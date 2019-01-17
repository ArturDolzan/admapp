import { Component, OnInit } from '@angular/core';
import { Chat, EnumTipoChat } from './chat.model';
import { ChatService } from './chat.service';
import { NotificationService } from 'src/app/shared/messages/notification.service';
import { HubsService } from 'src/app/shared/hubs/hubs.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  listaLogados: any[]

  constructor(private chatService: ChatService,
              private notificationService: NotificationService,
              private hubsService: HubsService,
              private router: Router) { }

  ngOnInit() {
    
    this.listarLogados()

    this.hubsService.publicarUsuarioConectou.pipe(tap(()=>{
      this.listarLogados()
    }) ).subscribe()

    this.hubsService.publicarUsuarioDesconectou.pipe(tap(()=>{
      this.listarLogados()
    }) ).subscribe()
    
  }

  listarLogados() {
    this.chatService.RecuperarUsuariosConectadosChat()
    .subscribe( conteudo=> this.cbListarLogados(conteudo), error => {
      this.notificationService.notify(JSON.parse(error._body).Mensagem)
    })
  }

  cbListarLogados(conteudo: any){
    this.listaLogados = conteudo.Dados
  }

  qtdeLogados() {
    if(this.listaLogados){
      return this.listaLogados.length
    }
    return 0
  }

  navegarChatDirect(usuario) {
    this.router.navigate(['/chat-direct', usuario.ConnectionId, usuario.AppUser])
  }

}
