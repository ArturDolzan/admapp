import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Cidades } from './cidades.model';
import { MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { CidadesService } from './cidades.service';
import { NotificationService } from '../../../shared/messages/notification.service';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-cidades',
  templateUrl: './cidades.component.html',
  styleUrls: ['./cidades.component.css']
})
export class CidadesComponent implements OnInit, AfterViewInit {

  searchBarState = 'hidden'

  cidades: Cidades[]

  displayedColumns: string[] = ['actionsColumn', 'Codigo', 'Nome', 'CodigoIbge', 'Estado', 'Populacao2010', 'DensidadeDemo', 'Gentilico', 'Area']
  dataSource

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  loading: boolean = true
  selectedRowIndex: number = -1
  selectedRow: any
  selection = new SelectionModel<Cidades>(false, null)

  constructor(private cidadesService: CidadesService, 
              private notificationService: NotificationService,
              private router: Router) { 

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

    this.cidadesService.list(pageindex, this.paginator.pageSize, pageindex, filter, ["Estados"])
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
    this.router.navigate(['/cadastro-cidades', row.Id])
  }

  onNewClick() {     
     this.router.navigate(['/cadastro-cidades', 0])
  }

  onEditClicked(row) {
    this.router.navigate(['/cadastro-cidades', row.Id])
  }

}
