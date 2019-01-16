import { Injectable, OnInit } from "@angular/core";
import { BroadcastEventListener, SignalR } from "ng2-signalr";

@Injectable({
    providedIn: 'root'
})
export class HubsService {

    con: any
    _connection: any
  
    constructor(private _signalR: SignalR) { 
      this._connection = _signalR.createConnection();

      this.iniciar()
    }
  
    iniciar() {
      
      this._connection.start().then((c) => {
        console.log("Conectado Signalr")
        
      } ).catch((c) => console.log("Erro conectar Signalr")); 
  
      let onPublicarparaUsuario = new BroadcastEventListener<any>('PublicarParaUsuario');
      this._connection.listen(onPublicarparaUsuario);
      
      onPublicarparaUsuario.subscribe((data) => {
        console.log(data.Mensagem)
        alert(data.Mensagem)
      });

    }

    enviarMensagemParaUsuario(usuario: string, mensagem: string) {
        this._connection.invoke('EnviarMensagemParaUsuario', usuario, mensagem).then((data: string[]) => {
            
        });
    }

}