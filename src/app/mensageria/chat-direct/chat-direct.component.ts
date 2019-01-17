import { Component, OnInit } from '@angular/core';
import { ChatDirect } from './chat-direct.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-direct',
  templateUrl: './chat-direct.component.html',
  styleUrls: ['./chat-direct.component.css']
})
export class ChatDirectComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  conectionId: string
  appUser: string

  chatUsuarioLogado: ChatDirect[] = [
    {
      NomeUsuario: 'Tuca',
      CaminhoFoto: 'assets/user2-160x160.jpg',
      DataHora: new Date(),
      Mensagem: 'Que nada =/'
    }
  ]

  chatOutrosUsuarios: ChatDirect[] = [
    {
      NomeUsuario: 'Jaca',
      CaminhoFoto: 'assets/user2-160x160.jpg',
      DataHora: new Date(),
      Mensagem: 'Ta pronto??'
    }
  ]

  ngOnInit() {
    this.conectionId = this.route.snapshot.params['ConectionId']
    this.appUser = this.route.snapshot.params['AppUser']
    
  }

}
