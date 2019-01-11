import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-botaonovolistar',
  templateUrl: './botaonovolistar.component.html',
  styleUrls: ['./botaonovolistar.component.css']
})
export class BotaonovolistarComponent implements OnInit {

  @Output() clickBotaoNovo = new EventEmitter<any>();
  @Output() clickBotaoListar = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onNewClick() {
    this.clickBotaoNovo.emit()
  }

  onList() {
    this.clickBotaoListar.emit()
  }

}
