import { Injectable, EventEmitter } from "@angular/core";
import { AppHeaders } from "../../shared/auth/app-headers";
import { Observable } from "rxjs";
import { URL_API } from "../../app.config";
import { RequestOptions, Http } from "@angular/http";
import { map, tap } from "rxjs/operators";
import { HubsService } from "src/app/shared/hubs/hubs.service";
import { ChatDirect } from "./chat-direct.model";

@Injectable({
    providedIn: 'root'
})
export class ChatDirectService extends AppHeaders {    
    constructor(private http: Http,
                private hubService: HubsService) {
        super()

        this.hubService.publicarParaUsuario.pipe(tap(mensagem=>{
            this.publicarParaUsuarioChat.emit(mensagem)
         }) ).subscribe() 

         this.hubService.publicarDigitando.pipe(tap((usuario)=>{
             
            this.publicarDigitando.emit(usuario)
         }) ).subscribe() 

         this.hubService.publicarVisualizado.pipe(tap((usuario)=>{
             
            this.publicarVisualizado.emit(usuario)
         }) ).subscribe() 
    }

    controllerName: string = 'Chat'

    publicarParaUsuarioChat = new EventEmitter<ChatDirect>()
    publicarDigitando = new EventEmitter()
    publicarVisualizado = new EventEmitter()

    recuperarUsuarioLogado(): string{
        return this.getUsuario()
    }

    recuperarChat(usuarioOrigem: string, usuarioDestino: string): Observable<any[]> {
       
        let body = JSON.stringify({
            UsuarioOrigem: usuarioOrigem,
            UsuarioDestino: usuarioDestino
        })
        
        let headers      = this.getHeaders();
        let options      = new RequestOptions({ headers: headers }); 
        
        return this.http.post(`${URL_API}/${this.controllerName}/RecuperarChat`, body, options)
                    .pipe(map(response => response.json().Content))  
    }

    enviarMensagem(usuarioOrigem: string, usuarioDestino: string, mensagem: string) {
        if(mensagem){
            this.hubService.enviarMensagemParaUsuario(usuarioOrigem, usuarioDestino, mensagem)
        }
    }

    marcarMensagensVisualizadas(usuarioOrigem: string, usuarioDestino: string): Observable<any> {
       
        let body = JSON.stringify({
            UsuarioOrigem: usuarioOrigem,
            UsuarioDestino: usuarioDestino
        })
        
        let headers      = this.getHeaders();
        let options      = new RequestOptions({ headers: headers }); 
        
        return this.http.post(`${URL_API}/${this.controllerName}/MarcarMensagensVisualizadas`, body, options)
                    .pipe(map(response => response.json().Content))  
    }

    enviarDigitandoMensagem(usuarioOrigem: string, usuarioDestino: string) {
        this.hubService.enviarDigitandoMensagem(usuarioOrigem, usuarioDestino)
    }

    enviarVisualizado(usuarioOrigem: string, usuarioDestino: string) {
        this.hubService.enviarVisualizado(usuarioOrigem, usuarioDestino)
    }

}