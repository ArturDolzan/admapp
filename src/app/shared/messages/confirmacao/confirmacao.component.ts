import { Component, OnInit } from '@angular/core';
import { ConfirmacaoService, EnumTipoConfirmacao } from './confirmacao.service';

@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.component.html',
  styleUrls: ['./confirmacao.component.css']
})
export class ConfirmacaoComponent implements OnInit {

  message: any;

  constructor(private confirmacaoService: ConfirmacaoService) { }

  ngOnInit() {
    this.confirmacaoService.getMessage().subscribe(message => {      
      this.message = message;      
      // @ts-ignore
      $('#modalCenter').modal('show')
     });
  }

  exibirBotaoSim() {

    if(!this.message){
      return true
    }

    return this.message.tipo === EnumTipoConfirmacao.Pergunta
  }

  exibirBotaoNao() {

    if(!this.message){
      return true
    }

    return this.message.tipo === EnumTipoConfirmacao.Pergunta
  }

  exibirBotaoOk() {
    
    if(!this.message){
      return true
    }

    return this.message.tipo === (EnumTipoConfirmacao.Aviso || EnumTipoConfirmacao.Informacao)
  }

  renderizarIconePergunta() {
    if(!this.message){
      return true
    }

    return this.message.tipo === EnumTipoConfirmacao.Pergunta
  }

  renderizarIconeAviso() {
    if(!this.message){
      return true
    }

    return this.message.tipo === EnumTipoConfirmacao.Aviso
  }

  renderizarIconeInformacao() {
    if(!this.message){
      return true
    }

    return this.message.tipo === EnumTipoConfirmacao.Informacao
  }

}
