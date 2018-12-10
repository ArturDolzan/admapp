import { Component, OnInit, Input, forwardRef, AfterContentInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-link-ativo-inativo',
  templateUrl: './link-ativo-inativo.component.html',
  styleUrls: ['./link-ativo-inativo.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=>LinkAtivoInativoComponent),
      multi: true
    }
  ]
})
export class LinkAtivoInativoComponent implements OnInit, ControlValueAccessor, AfterContentInit {

  @Input() status : any

  onChange: any

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(){    
    if(this.status != "0" && this.status != "1"){
      throw new Error('Esse componente precisa ser usado com valor 1 ou 0')
    }
  }

  estaAtivo(): boolean {
    return this.status == "1" ? true : false
  }

  clicouAtivo() {
    this.status = "0"
    this.onChange(this.status)
  }

  clicouInativo() {
    this.status = "1"
    this.onChange(this.status)
  }

  /**
   * Write a new value to the element.
   */
  writeValue(obj: any): void {
    this.status = obj
  }
  /**
   * Set the function to be called when the control receives a change event.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  /**
   * Set the function to be called when the control receives a touch event.
   */
  registerOnTouched(fn: any): void {}
  /**
   * This function is called when the control status changes to or from "DISABLED".
   * Depending on the value, it will enable or disable the appropriate DOM element.
   *
   * @param isDisabled
   */
  setDisabledState?(isDisabled: boolean): void {}

}
