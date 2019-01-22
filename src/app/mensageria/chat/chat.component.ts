import { Component, OnInit } from '@angular/core';
import { Chat, EnumTipoChat } from './chat.model';
import { ChatService } from './chat.service';
import { NotificationService } from 'src/app/shared/messages/notification.service';
import { HubsService } from 'src/app/shared/hubs/hubs.service';
import { tap, first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { URL_HUB } from '../../app.config';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  listaLogados: any[]
  servicoPublicarAudioChat: any

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

    
    this.servicoPublicarAudioChat = this.hubsService.publicarParaUsuario.pipe( tap(mensagem=>{
        this.listarLogados()
      
    })).subscribe() 
    
  }

  ngOnDestroy() {
    this.servicoPublicarAudioChat.unsubscribe()
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
      let qtde = this.listaLogados.length - 1

      if(qtde < 0){
        qtde = 0
      }

      return qtde
    }
    return 0
  }

  navegarChatDirect(usuario) {
    this.router.navigate(['/chat-direct', usuario.ConnectionId, usuario.AppUser])
  }

  renderizarSino(user) {
    return user.QtdeMsgNaoVisualizadas > 0 ? true : false
  }

  usuarioLogado() {
    return this.chatService.getUsuario()
  }

  renderizaImagemUsuario(user) {    
    return (user.Foto === null || user.Foto === undefined)  ? "assets/user.png" : `${URL_HUB}/${user.Foto}`
  }

  renderizaNinguemOnline() {
    return this.qtdeLogados() === 0 ? true : false
  }

}
