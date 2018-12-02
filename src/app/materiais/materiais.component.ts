import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material';
import { Materiais } from './materiais.model';
import { MateriaisService } from './materiais.service';


@Component({
  selector: 'app-materiais',
  templateUrl: './materiais.component.html',
  styleUrls: ['./materiais.component.css']
})
export class MateriaisComponent  implements OnInit {

  materiais: Materiais[]

  displayedColumns: string[] = ['Codigo', 'Descricao', 'Quantidade', 'Valorunitario', 'Observacao', 'Ativo'];
  dataSource

  constructor(private materiaisService: MateriaisService) { 

  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    
    this.materiaisService.materiais().subscribe( data=>{
      this.dataSource = data
    })
  
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row);
}

}
