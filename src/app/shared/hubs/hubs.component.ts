import { Component, OnInit } from '@angular/core';
import { SignalR, BroadcastEventListener } from 'ng2-signalr';
import { HubsService } from './hubs.service';

@Component({
  selector: 'app-hubs',
  templateUrl: './hubs.component.html',
  styleUrls: ['./hubs.component.css']
})
export class HubsComponent implements OnInit {

  constructor(private hubsService: HubsService) { }

  ngOnInit() {        
  }

}
