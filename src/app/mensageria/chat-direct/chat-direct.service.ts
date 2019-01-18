import { Injectable } from "@angular/core";
import { AppHeaders } from "../../shared/auth/app-headers";
import { Observable } from "rxjs";
import { URL_API } from "../../app.config";
import { RequestOptions, Http } from "@angular/http";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ChatDirectService extends AppHeaders {    
    constructor(private http: Http) {
        super()
    }

    controllerName: string = 'Chat'

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
}