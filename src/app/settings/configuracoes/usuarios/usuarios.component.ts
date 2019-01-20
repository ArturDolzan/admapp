import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Usuarios, EnumTipoUsuariosAdm } from './usuarios.model';
import { MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { UsuariosService } from './usuarios.service';
import { NotificationService } from '../../../shared/messages/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, AfterViewInit {

  searchBarState = 'hidden'

  usuarios: Usuarios[]
  enumTipoUsuariosAdm = EnumTipoUsuariosAdm

  displayedColumns: string[] = ['actionsColumn', 'Codigo', 'Nome', 'NomeCompleto']
  dataSource

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  loading: boolean = true
  selectedRowIndex: number = -1
  selectedRow: any
  selection = new SelectionModel<Usuarios>(false, null)

  constructor(private usuariosService: UsuariosService, 
              private notificationService: NotificationService,
              private router: Router) { 

  }

  enumTipoUsuario(value){
    return this.enumTipoUsuariosAdm[value]
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

    this.usuariosService.list(pageindex, this.paginator.pageSize, pageindex, filter)
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
    this.router.navigate(['/cadastro-usuarios', row.Id])
  }

  onNewClick() {     
     this.router.navigate(['/cadastro-usuarios', 0])
  }

  onEditClicked(row) {
    this.router.navigate(['/cadastro-usuarios', row.Id])
  }

}
