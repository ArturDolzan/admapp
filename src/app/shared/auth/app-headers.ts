import { Headers } from "@angular/http";
import { IAppHeaders } from "./iapp-headers";

export class AppHeaders implements IAppHeaders {
    
    constructor(){}

    getHeaders(): Headers{
        // @ts-ignore
        let bearer = 'Bearer ' + Cookies.get('AppToken')

        let headers      = new Headers({ 'Content-Type': 'application/json' }); 
        headers.set('Authorization', bearer)

        return headers
    }

    getUsuario(): string {
        // @ts-ignore
        return Cookies.get('AppUser') == null ? 'AppNoAuth' : Cookies.get('AppUser')
    }

    removerCookies(){
        // @ts-ignore
        Cookies.set('AppToken', '')

        // @ts-ignore
        Cookies.set('AppUser', '')
    }
}