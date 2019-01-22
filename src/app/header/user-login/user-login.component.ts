import { Component, OnInit } from '@angular/core';
import { ServUserLogin } from './user-login.service';
import { UserLogin } from './user-login.model';
import { tap } from 'rxjs/operators';
import { NotificationService } from 'src/app/shared/messages/notification.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html'
})
export class UserLoginComponent implements OnInit {
  
  constructor(private servUserLogin: ServUserLogin,
              private notificationService: NotificationService ) {
  }

  userLogin: UserLogin

  ngOnInit() {    
    this.userLogin = this.servUserLogin.recuperarUsuario()

    this.servUserLogin.usuarioAutenticadoEmit.pipe(tap(()=>{

      this.servUserLogin.recuperarPorUsuario()
        .subscribe( conteudo => this.cbRecuperarPorUsuario(conteudo), error => {
          this.notificationService.notify(JSON.parse(error._body).Mensagem)
        })

    }) ).subscribe()  

  }

  cbRecuperarPorUsuario(conteudo) {
   
    this.userLogin.Id = conteudo.Dados.Id
    this.userLogin.Nome = conteudo.Dados.Nome
    this.userLogin.NomeCompleto = conteudo.Dados.NomeCompleto

    if(conteudo.Dados.Foto){
      this.userLogin.Foto = 'data:image/jpeg;base64,' + conteudo.Dados.Foto
    }
    
  }

  onClickSair() {
    this.servUserLogin.removerCookies()
    this.servUserLogin.redirecionarUrlLogin()
  }

  renderizaImagemUsuario() {    
    return (this.userLogin.Foto === ' ' || this.userLogin.Foto === undefined)  ? "assets/user.png" : this.userLogin.Foto
  }

}
