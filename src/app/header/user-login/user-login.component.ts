import { Component, OnInit } from '@angular/core';
import { ServUserLogin } from './user-login.service';
import { UserLogin, EnumUserLogin } from './user-login.model';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html'
})
export class UserLoginComponent implements OnInit {
  
  constructor(private servUserLogin: ServUserLogin ) {
  }

  private enumUserLogin = EnumUserLogin
  userLogin: UserLogin

  ngOnInit() {    
    this.userLogin = this.servUserLogin.recuperarUsuario()
  }

}
