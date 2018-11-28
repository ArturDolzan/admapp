import { Component, OnInit } from '@angular/core';
import { ServUserLogin } from '../header/user-login/user-login.service';
import { UserLogin, EnumUserLogin } from '../header/user-login/user-login.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  constructor(private servUserLogin: ServUserLogin) { }

  private enumUserLogin = EnumUserLogin
  userLogin: UserLogin

  ngOnInit() {
      this.userLogin = this.servUserLogin.recuperarUsuario()
  }

}
