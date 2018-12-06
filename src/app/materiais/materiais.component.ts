import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatDialogConfig, MatDialog, MatPaginator, MatSort} from '@angular/material';
import { Materiais } from './materiais.model';
import { MateriaisService } from './materiais.service';
import { SelectionModel } from '@angular/cdk/collections';
import { CadastroMateriaisComponent } from './cadastro-materiais/cadastro-materiais.component';
import { map, filter, scan, tap, merge, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { fromEvent } from 'rxjs';


@Component({
  selector: 'app-materiais',
  templateUrl: './materiais.component.html',
  styleUrls: ['./materiais.component.css']
})
export class MateriaisComponent  implements OnInit, AfterViewInit {

  materiais: Materiais[]

  displayedColumns: string[] = ['actionsColumn', 'Codigo', 'Descricao', 'Quantidade', 'Valorunitario', 'Observacao', 'Ativo']
  dataSource

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort
  @ViewChild('input') input: ElementRef

  loading: boolean = true
  selectedRowIndex: number = -1
  selectedRow: any
  selection = new SelectionModel<Materiais>(false, null)

  constructor(private materiaisService: MateriaisService, 
              private dialog: MatDialog) { 

  }

  ngOnInit() {    
  }

  ngAfterViewInit() {
        
    this.list()

    fromEvent(this.input.nativeElement,'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(data => {
                    this.paginator.pageIndex = 0;
                    
                })
            )
            .subscribe();

    this.sort.sortChange.subscribe(data => {
      this.paginator.pageIndex = 0      
    });

    this.paginator.page.pipe( tap(data => { 
      
      
     })).subscribe()
}

  list(): void{

    let filterValue = this.input.nativeElement.value
    

    this.loading = true
    this.materiaisService.materiais().subscribe( conteudo=> this.cbList(conteudo) )
  }

  cbList(data){
    this.loading = false
    this.dataSource = data
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

  onEditClicked(row) {
    this.openDialog(row)
  }

  openDialog(data: Materiais) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "600px"

    dialogConfig.data = data

    const dialogRef = this.dialog.open(CadastroMateriaisComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(      
        data => {          
          if(data){
            if(data.isSaved){
              this.savedDialog(data)
            }
            if(data.isRemoved){
              this.removedDialog(data)
            }
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
