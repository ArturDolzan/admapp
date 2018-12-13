import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatDialogConfig, MatDialog, MatPaginator, MatSort} from '@angular/material';
import { Materiais, EnumMateriaisAtivo } from './materiais.model';
import { MateriaisService } from './materiais.service';
import { SelectionModel } from '@angular/cdk/collections';
import { CadastroMateriaisComponent } from './cadastro-materiais/cadastro-materiais.component';
import { map, filter, scan, tap, merge, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { fromEvent, pipe } from 'rxjs';
import { NotificationService } from '../shared/messages/notification.service';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-materiais',
  templateUrl: './materiais.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        "max-height": "0px"
      })),
      state('visible', style({
        opacity: 1,
        "max-height": "70px"
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ],
  styleUrls: ['./materiais.component.css']
})
export class MateriaisComponent implements OnInit, AfterViewInit {

  searchBarState = 'hidden'

  materiais: Materiais[]
  enumMateriaisAtivo = EnumMateriaisAtivo

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
              private dialog: MatDialog,
              private notificationService: NotificationService) { 

  }

  toggleSearch(){
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden'
  }

  enumAtivo(value){
    return this.enumMateriaisAtivo[value]
  }

  ngOnInit() {       
  }

  ngAfterViewInit() {      

    this.list()

    fromEvent(this.input.nativeElement,'keyup')
            .pipe(
                debounceTime(400),
                distinctUntilChanged(),
                tap(data => {
                    
                    console.log('Implementar filtro...')
                })
            )
            .subscribe();

    this.sort.sortChange.subscribe(data => {
      console.log('Implementar...')
    });

    this.paginator.page.pipe( tap(data => { 
      
      this.list()
     })).subscribe()
}

  list(): void{

    let filterValue = this.input.nativeElement.value
    
    let pageindex = this.paginator.pageIndex +1

    this.loading = true
    this.materiaisService.materiais(pageindex, this.paginator.pageSize, pageindex)
        .subscribe( conteudo=> this.cbList(conteudo), error => {
          this.loading = false
          this.notificationService.notify(JSON.parse(error._body).Mensagem)
        })
  }

  cbList(data){
    this.loading = false

    this.paginator.length = data.Total
    this.dataSource = data.Dados
  }

  onList(){
    this.list()
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
    mat.Ativo = this.enumMateriaisAtivo.Sim
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
