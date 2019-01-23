import { Injectable, EventEmitter } from "@angular/core";
import { BroadcastEventListener, SignalR } from "ng2-signalr";
import { ChatDirect } from "src/app/mensageria/chat-direct/chat-direct.model";

@Injectable({
    providedIn: 'root'
})
export class HubsService {

    con: any
    _connection: any

    publicarParaUsuario = new EventEmitter<ChatDirect>()
    publicarDigitando = new EventEmitter<string>()
    publicarVisualizado = new EventEmitter<string>()

    publicarUsuarioConectou = new EventEmitter()
    publicarUsuarioDesconectou = new EventEmitter()
  
    constructor(private _signalR: SignalR) { 
      this._connection = _signalR.createConnection();

      this.iniciar()
    }
  
    iniciar() {
      
      this._connection.start().then((c) => {
        console.log("Conectado Signalr")
        
      } ).catch((c) => console.log("Erro conectar Signalr")); 
  
      this.registrarEscutaPublicarParaUsuario()
      this.registrarUsuarioConectou()
      this.registrarUsuarioDesconectou()
      this.registrarEscutaEnviarDigitando()
      this.registrarEscutaEnviarVisualizado()

    }

    playAudio(){
      let audio = new Audio();
      audio.src = "assets/audio/chat.wav";
      audio.load();
      audio.play();
    }

    registrarEscutaPublicarParaUsuario(){
      let onPublicarparaUsuario = new BroadcastEventListener<any>('PublicarParaUsuario');
      this._connection.listen(onPublicarparaUsuario);
      
      onPublicarparaUsuario.subscribe((data) => {
        this.playAudio()
        this.publicarParaUsuario.emit(data)
      });
    }

    registrarEscutaEnviarDigitando(){
      let onPublicarDigitando = new BroadcastEventListener<any>('EnviarDigitando');
      this._connection.listen(onPublicarDigitando);
      
      onPublicarDigitando.subscribe((usuario) => {

        this.publicarDigitando.emit(usuario)
      });
    }

    registrarEscutaEnviarVisualizado(){
      let onPublicarVisualizado = new BroadcastEventListener<any>('EnviarVisualizado');
      this._connection.listen(onPublicarVisualizado);
      
      onPublicarVisualizado.subscribe((usuario) => {

        this.publicarVisualizado.emit(usuario)
      });
    }

    registrarUsuarioConectou(){
      let onUsuarioConectou = new BroadcastEventListener<any>('NotificarUsuarioConectou');
      this._connection.listen(onUsuarioConectou);
      
      onUsuarioConectou.subscribe(() => {
        this.publicarUsuarioConectou.emit()
      });
    }

    registrarUsuarioDesconectou(){
      let onUsuarioDesconectou = new BroadcastEventListener<any>('NotificarUsuarioDesconectou');
      this._connection.listen(onUsuarioDesconectou);
      
      onUsuarioDesconectou.subscribe(() => {
        this.publicarUsuarioDesconectou.emit()
      });
    }



    enviarMensagemParaUsuario(usuarioOrigem: string, usuarioDestino: string, mensagem: string) {
        this._connection.invoke('EnviarMensagemParaUsuario', usuarioOrigem, usuarioDestino, mensagem).then((data: string[]) => {
            
        });
    }

    enviarDigitandoMensagem(usuarioOrigem: string, usuarioDestino: string) {
      this._connection.invoke('EnviarDigitandoMensagem', usuarioOrigem, usuarioDestino).then((data: string[]) => {
          
      });
    }

    enviarVisualizado(usuarioOrigem: string, usuarioDestino: string) {
      this._connection.invoke('EnviarVisualizado', usuarioOrigem, usuarioDestino).then((data: string[]) => {
            
      });
    }

}