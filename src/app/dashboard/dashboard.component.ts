import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Output() click = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }
}
