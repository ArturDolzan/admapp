import { Component, OnInit } from '@angular/core';
import { HubsService } from './hubs.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-hubs',
  templateUrl: './hubs.component.html',
  styleUrls: ['./hubs.component.css']
})
export class HubsComponent implements OnInit {

  constructor(private hubsService: HubsService) { }

  ngOnInit() {
    // this.hubsService.publicarParaUsuario.pipe(tap(mensagem=>{
      
    //   let msg = mensagem

    // }) ).subscribe()        
  }

}
