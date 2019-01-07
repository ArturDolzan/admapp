import { Injectable } from '@angular/core'; 
import { Router, NavigationStart } from '@angular/router'; 
import { Observable, Subject } from 'rxjs'; 

@Injectable({
    providedIn: 'root'
  })

export class ConfirmacaoService {
    private subject = new Subject<any>();
    
    constructor(){}
    
    confirm(message: string,
            titulo: string,
            tipo: EnumTipoConfirmacao,
            siFn:()=>void,
            noFn:()=>void){
        this.setConfirmation(message, titulo, tipo, siFn,noFn);
    }

    setConfirmation(message: string, titulo: string, tipo: EnumTipoConfirmacao, siFn:()=>void,noFn:()=>void) {
        let that = this;
        this.subject.next({ type: "confirm",
                text: message,
                titulo: titulo,
                tipo: tipo,
                siFn:
                function(){
                    that.subject.next(); //this will close the modal
                    siFn();
                },
                noFn:function(){
                    that.subject.next();
                    noFn();
                }
                });

            }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}

export enum EnumTipoConfirmacao {
    Pergunta = 1,
    Aviso = 2,
    Informacao = 3
}