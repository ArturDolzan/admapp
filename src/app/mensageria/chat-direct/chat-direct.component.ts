import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { ChatDirect, EnumChatVisualizado } from './chat-direct.model';
import { ActivatedRoute } from '@angular/router';
import { ChatDirectService } from './chat-direct.service';
import { NotificationService } from '../../shared/messages/notification.service';
import { tap, debounceTime, distinctUntilChanged, first } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { URL_HUB } from '../../app.config';
import { ServUserLogin } from '../../header/user-login/user-login.service';

@Component({
  selector: 'app-chat-direct',
  templateUrl: './chat-direct.component.html',
  styleUrls: ['./chat-direct.component.css']
})
export class ChatDirectComponent implements OnInit, AfterViewInit {

  constructor(private route: ActivatedRoute,
              private chatDirectService: ChatDirectService,
              private notificationService: NotificationService,
              private servUserLogin: ServUserLogin,
              private formBuilder: FormBuilder) { }

  cadForm: FormGroup        
  @ViewChildren('mensagem') vcMensagem;

  conectionId: string
  appUserDestino: string
  digitando: boolean = false
  iniciouDigitando: boolean = false

  chatDirect: ChatDirect[] = []
  servicoPublicarParaUsuarioChat: any
  servicoPublicarDigitar: any
  servicoInicioDigitar: any
  telaEmoji: boolean = false
  emoji: any
  fotoUsuarioLogado: string

  @ViewChild('mensagem') mensagem: ElementRef

  ngOnInit() {
    this.cadForm = this.formBuilder.group({
      CampoDigitando: this.formBuilder.control("")
    })

    this.cadForm.setValue({
      CampoDigitando: ""
    });

    this.conectionId = this.route.snapshot.params['ConectionId']
    this.appUserDestino = this.route.snapshot.params['AppUser']

    this.servUserLogin.recuperarPorUsuario()
      .subscribe( conteudo => this.cbRecuperarPorUsuario(conteudo), error => {
        this.notificationService.notify(JSON.parse(error._body).Mensagem)
      })

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

  cbRecuperarPorUsuario(conteudo) {
    if(conteudo.Dados.Foto){
      this.fotoUsuarioLogado =  conteudo.Dados.Foto
    }
  }

  renderizaImagemUsuario(chat: ChatDirect) {
    if(chat.UsuarioOrigem === this.chatDirectService.recuperarUsuarioLogado()){
      return (this.fotoUsuarioLogado === null || this.fotoUsuarioLogado === undefined)  ? "assets/user.png" : `${URL_HUB}/${this.fotoUsuarioLogado}`
    }else{
      return (chat.FotoOrigem === null || chat.FotoOrigem === undefined)  ? "assets/user.png" : `${URL_HUB}/${chat.FotoOrigem}`
    }
  }

  renderizaNomeUsuario(chat: ChatDirect) {
    if(chat.UsuarioOrigem === this.chatDirectService.recuperarUsuarioLogado()){
      return this.chatDirectService.recuperarUsuarioLogado()
    }else{
      return this.appUserDestino
    }
  }

  ngAfterViewInit() {      

    this.servicoInicioDigitar = fromEvent(this.mensagem.nativeElement,'keyup')
          .pipe(
              debounceTime(75),
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

  renderizaEmoji(mensagem: string){

    if(!mensagem){
      return null
    }

    // @ts-ignore
    return wdtEmojiBundle.render(mensagem)
  }

  renderizarMensagemEnviada(mensagem: string) {
    const nd = new Date;

    const chat: ChatDirect = {
          UsuarioOrigem: this.chatDirectService.recuperarUsuarioLogado(),
           UsuarioDestino: this.appUserDestino,
           DataHora: nd,
           Mensagem: mensagem,
           FotoOrigem: this.fotoUsuarioLogado,
           FotoDestino: ' ',
           Visualizado: EnumChatVisualizado.NaoVisualizado
    }

    this.chatDirect = [...this.chatDirect , chat];

    this.cadForm.controls['CampoDigitando'].setValue("")
    
    if(this.telaEmoji){
      this.telaEmoji = false
    }
  }

  renderizarMensagemRecebida(chat: ChatDirect) {

    if(chat.UsuarioOrigem === this.appUserDestino){
      const chatobj: ChatDirect = {
        UsuarioOrigem: chat.UsuarioOrigem,
         UsuarioDestino: this.appUserDestino,
         DataHora: chat.DataHora,
         Mensagem: chat.Mensagem,
         FotoOrigem: chat.FotoOrigem,
         FotoDestino: chat.FotoDestino,
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

  exibirTelaEmoji() {
    return this.telaEmoji
  }

  alterarTelaEmoji() { 
    this.telaEmoji = !this.telaEmoji
  }

  inserirEmoji(emoji, $event) {
    let emo = $event.emoji.colons

    this.cadForm.controls['CampoDigitando'].setValue(this.cadForm.controls['CampoDigitando'].value + emo)

    this.vcMensagem.first.nativeElement.focus();
  }

}
