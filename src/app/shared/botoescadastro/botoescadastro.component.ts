import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-botoescadastro',
  templateUrl: './botoescadastro.component.html',
  styleUrls: ['./botoescadastro.component.css']
})
export class BotoescadastroComponent implements OnInit {

  @Output() clickBotaoNavegarLista = new EventEmitter<any>();
  @Output() clickBotaoRemover = new EventEmitter<any>();
  @Output() clickBotaoSalvar = new EventEmitter<any>();

  @Input() ehNovo: boolean
  @Input() ehFormValido: boolean

  constructor() { }

  ngOnInit() {
  }

  navegarParaLista() {
    this.clickBotaoNavegarLista.emit()
  }

  remove() {
    this.clickBotaoRemover.emit()
  }

  save() {
    this.clickBotaoSalvar.emit()
  }

  getEhNovo() {
    return this.ehNovo
  }

  getEhFormValido() {
    return this.ehFormValido
  }

}
