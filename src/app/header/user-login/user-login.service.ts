import {Injectable, Inject} from '@angular/core'

import {UserLogin, EnumUserLogin} from './user-login.model'
import { Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { URL_API, URL_LOGIN } from '../../app.config';
import { ErrorHandler } from '../../app.error-handler';
import { AppHeaders } from '../../shared/auth/app-headers';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root',
})

export class ServUserLogin extends AppHeaders {

    constructor(private http: Http, @Inject(DOCUMENT) private document: any){
        super()
    }

    autenticado(): Observable<any>{
    
        let headers = this.getHeaders();
        
        let options      = new RequestOptions({ headers: headers }); 
    
        return this.http.post(`${URL_API}/Usuarios/Autenticado`, null, options)
          .pipe(map(response => response))
      }
    
    recuperarUsuario(): any{

        let userLogin: UserLogin = {
            Id: 1,
            Nome: 'App',
            NomeCompleto: 'NomeCompleto',
            Foto: ' ',
            Status: EnumUserLogin.online
        }

        this.autenticado().subscribe(resposta => {
            
           userLogin.Nome = this.getUsuario()
           userLogin.NomeCompleto = this.getNomeUsuario()
           userLogin.Foto = this.getFotoUsuario()

        }, error => {
            this.redirecionarUrlLogin()
        })

        return userLogin
    }

    redirecionarUrlLogin() {
        this.document.location.href = URL_LOGIN
    }

}