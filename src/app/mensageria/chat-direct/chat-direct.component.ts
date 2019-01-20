import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ChatDirect, EnumChatVisualizado } from './chat-direct.model';
import { ActivatedRoute } from '@angular/router';
import { ChatDirectService } from './chat-direct.service';
import { NotificationService } from '../../shared/messages/notification.service';
import { tap, debounceTime, distinctUntilChanged, first } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-chat-direct',
  templateUrl: './chat-direct.component.html',
  styleUrls: ['./chat-direct.component.css']
})
export class ChatDirectComponent implements OnInit, AfterViewInit {

  constructor(private route: ActivatedRoute,
              private chatDirectService: ChatDirectService,
              private notificationService: NotificationService) { }

  conectionId: string
  appUserDestino: string
  digitando: boolean = false
  iniciouDigitando: boolean = false

  chatDirect: ChatDirect[] = []
  servicoPublicarParaUsuarioChat: any
  servicoPublicarDigitar: any
  servicoInicioDigitar: any

  @ViewChild('mensagem') mensagem: ElementRef

  ngOnInit() {
    this.conectionId = this.route.snapshot.params['ConectionId']
    this.appUserDestino = this.route.snapshot.params['AppUser']

    this.chatDirectService.marcarMensagensVisualizadas(this.appUserDestino, this.chatDirectService.recuperarUsuarioLogado()).subscribe(response => {
      
    }, error => {
      this.notificationService.notify(JSON.parse(error._body).Mensagem)
    })

    this.recuperarChat()    

    this.servicoPublicarParaUsuarioChat = this.chatDirectService.publicarParaUsuarioChat.pipe(tap(mensagem=>{
      this.renderizarMensagemRecebida(mensagem)
    }) ).subscribe()

    this.servicoPublicarDigitar = this.chatDirectService.publicarDigitando.pipe(tap((usuario)=>{
     
      if(usuario === this.appUserDestino){
        this.digitando = true
      }
    }) ).subscribe()
  }

  ngAfterViewInit() {      

    this.servicoInicioDigitar = fromEvent(this.mensagem.nativeElement,'keyup')
          .pipe(
              debounceTime(100),
              distinctUntilChanged(),
              tap((data) => {
                let tecla: any = data
                if(tecla.key !== 'Enter' && !this.iniciouDigitando){
                  this.chatDirectService.enviarDigitandoMensagem(this.chatDirectService.recuperarUsuarioLogado(), this.appUserDestino)
                  this.iniciouDigitando = true
                }
              })
          ).subscribe();
  }

  renderizarNomeChat() {
    return this.appUserDestino
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

  enviarMensagem(mensagem) {
    if(mensagem){
      this.chatDirectService.enviarMensagem(this.chatDirectService.recuperarUsuarioLogado(), this.appUserDestino, mensagem)
      this.renderizarMensagemEnviada(mensagem)
      this.iniciouDigitando = false
    }
  }

  renderizarMensagemEnviada(mensagem: string) {
    const nd = new Date;

    const chat: ChatDirect = {
          UsuarioOrigem: this.chatDirectService.recuperarUsuarioLogado(),
           UsuarioDestino: this.appUserDestino,
           DataHora: nd,
           Mensagem: mensagem,
           CaminhoFoto: 'assets/user2-160x160.jpg',
           Visualizado: EnumChatVisualizado.NaoVisualizado
    }

    this.chatDirect = [...this.chatDirect , chat];
  }

  renderizarMensagemRecebida(chat: ChatDirect) {

    if(chat.UsuarioOrigem === this.appUserDestino){
      const chatobj: ChatDirect = {
        UsuarioOrigem: chat.UsuarioOrigem,
         UsuarioDestino: this.appUserDestino,
         DataHora: chat.DataHora,
         Mensagem: chat.Mensagem,
         CaminhoFoto: chat.CaminhoFoto,
         Visualizado: EnumChatVisualizado.Viualizado
      } 
  
      this.chatDirect = [...this.chatDirect , chat];

      this.digitando = false

      this.chatDirectService.marcarMensagensVisualizadas(this.appUserDestino, this.chatDirectService.recuperarUsuarioLogado()).subscribe(response => {
        this.iniciouDigitando = false
      }, error => {
        this.notificationService.notify(JSON.parse(error._body).Mensagem)
      })
      
    }    
  }

  ngOnDestroy() {
    this.servicoPublicarParaUsuarioChat.unsubscribe()
    this.servicoInicioDigitar.unsubscribe()
    this.servicoPublicarDigitar.unsubscribe()
  }

  renderizarDigitando() {
    return this.digitando
  }

}
