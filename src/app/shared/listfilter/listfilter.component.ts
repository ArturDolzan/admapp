import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-listfilter',
  templateUrl: './listfilter.component.html',
  styleUrls: ['./listfilter.component.css'],
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
  ]
})
export class ListfilterComponent implements OnInit, AfterViewInit {

  searchBarState = 'hidden'
  @ViewChild('input') input: ElementRef
  @Output() sendDataToParent = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {      

    fromEvent(this.input.nativeElement,'keyup')
          .pipe(
              debounceTime(400),
              distinctUntilChanged(),
              tap(data => {
                  
                this.sendDataToParent.emit(this.input);
              })
          )
          .subscribe();
  }

  toggleSearch(){
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden'
  }

}
