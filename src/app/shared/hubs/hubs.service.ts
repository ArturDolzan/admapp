import { Injectable, EventEmitter } from "@angular/core";
import { BroadcastEventListener, SignalR } from "ng2-signalr";

@Injectable({
    providedIn: 'root'
})
export class HubsService {

    con: any
    _connection: any

    publicarParaUsuario = new EventEmitter<string>()

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

    }

    registrarEscutaPublicarParaUsuario(){
      let onPublicarparaUsuario = new BroadcastEventListener<any>('PublicarParaUsuario');
      this._connection.listen(onPublicarparaUsuario);
      
      onPublicarparaUsuario.subscribe((data) => {
        console.log(data.Mensagem)
        alert(data.Mensagem)
        this.publicarParaUsuario.emit(data.Mensagem)
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



    enviarMensagemParaUsuario(usuario: string, mensagem: string) {
        this._connection.invoke('EnviarMensagemParaUsuario', usuario, mensagem).then((data: string[]) => {
            
        });
    }

}