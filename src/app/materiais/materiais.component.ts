import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatPaginator, MatSort} from '@angular/material';
import { Materiais, EnumMateriaisAtivo } from './materiais.model';
import { MateriaisService } from './materiais.service';
import { SelectionModel } from '@angular/cdk/collections';
import { CadastroMateriaisComponent } from './cadastro-materiais/cadastro-materiais.component';
import { map, filter, scan, tap, merge, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { fromEvent, pipe } from 'rxjs';
import { NotificationService } from '../shared/messages/notification.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';


@Component({
  selector: 'app-materiais',
  templateUrl: './materiais.component.html',  
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

  loading: boolean = true
  selectedRowIndex: number = -1
  selectedRow: any
  selection = new SelectionModel<Materiais>(false, null)

  constructor(private materiaisService: MateriaisService, 
              private notificationService: NotificationService,
              private router: Router) { 

  }

  enumAtivo(value){
    return this.enumMateriaisAtivo[value]
  }

  ngOnInit() {       
  }

  ngAfterViewInit() {      

    this.list()

    this.sort.sortChange.subscribe(data => {
      console.log('Implementar...')
    });

    this.paginator.page.pipe( tap(data => { 
      
      this.list()
     })).subscribe()
}

  filtrarLista(data){
    this.list(data.nativeElement.value)
  }

  list(filter?: string): void{
    
    let pageindex = this.paginator.pageIndex +1

    this.loading = true

    this.materiaisService.list(pageindex, this.paginator.pageSize, pageindex, filter)
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
    this.router.navigate(['/cadastro-materiais', row.Id])
  }

  onNewClick() {
    this.router.navigate(['/cadastro-materiais', 0])
  }

  onEditClicked(row) {
    this.router.navigate(['/cadastro-materiais', row.Id])
  }

}
