import {Injectable} from '@angular/core'

import {UserLogin, EnumUserLogin} from './user-login.model'

@Injectable({
    providedIn: 'root',
})

export class ServUserLogin {
    
    recuperarUsuario(): UserLogin{

        const userLogin: UserLogin = {
            Id: 1,
            Nome: 'Artur Dolzan Neto',
            Status: EnumUserLogin.online
        }

        return userLogin
    }

}