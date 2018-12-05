import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialog} from '@angular/material';
import { Materiais } from './materiais.model';
import { MateriaisService } from './materiais.service';
import { SelectionModel } from '@angular/cdk/collections';
import { CadastroMateriaisComponent } from './cadastro-materiais/cadastro-materiais.component';


@Component({
  selector: 'app-materiais',
  templateUrl: './materiais.component.html',
  styleUrls: ['./materiais.component.css']
})
export class MateriaisComponent  implements OnInit {

  materiais: Materiais[]

  displayedColumns: string[] = ['Codigo', 'Descricao', 'Quantidade', 'Valorunitario', 'Observacao', 'Ativo']
  dataSource

  selectedRowIndex: number = -1
  selectedRow: any
  selection = new SelectionModel<Materiais>(false, null)

  constructor(private materiaisService: MateriaisService, 
              private dialog: MatDialog) { 

  }

  ngOnInit() {
    this.list()
  }

  list(): void{
    this.materiaisService.materiais().subscribe( conteudo=>{      
      this.dataSource = conteudo
    })
  }

  onRowClicked(row) {
    this.selectedRow = row
    this.selectedRowIndex = row.Id;
  }  

  onDblClicked(row) {
    this.openDialog(row)
  }

  onNewClick() {
    let mat = new Materiais()
    mat.Id = 0
    this.openDialog(mat)
  }

  openDialog(data: Materiais) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.data = data

    const dialogRef = this.dialog.open(CadastroMateriaisComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => {
          if(data.isSaved){
            this.savedDialog(data)
          }
          if(data.isRemoved){
            this.removedDialog(data)
          }
        }
    );
  }

  savedDialog(data: Materiais) {    
    if(data){
      this.list()
    }
  }

  removedDialog(data: Materiais) {    
    if(data){
      this.list()
    }
  }

}
