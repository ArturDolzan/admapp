import { Component, OnInit, Input, Output, AfterViewInit, ViewChild, AfterContentInit, ContentChild, forwardRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, NgModel, FormControlName, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CrudService } from '../services/crudService.service';
import { Http } from '@angular/http';
import { debounceTime, tap, switchMap, distinctUntilChanged, finalize, map } from 'rxjs/operators';
import { NotificationService } from '../messages/notification.service';

@Component({
  selector: 'app-autolist',
  templateUrl: './autolist.component.html',
  styleUrls: ['./autolist.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=>AutolistComponent),
      multi: true
    }
  ]
})
export class AutolistComponent extends CrudService implements OnInit, ControlValueAccessor {

  @Input() controllern: string
  @Input() label: string

  opcoesList: OpcoesList[] = [];
  listForm: FormGroup;
  isLoading = false;

  onChange: any

  constructor(private fb: FormBuilder,
              private notificationService: NotificationService,
              public http: Http) {
    super(http)    
  }

  ngOnInit() {

    this.controllerName = this.controllern

    this.listForm = this.fb.group({
      opcaoInput: this.fb.control('', [Validators.required])
    })

      this.listForm
      .get('opcaoInput')
      .valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => this.isLoading = true),
        switchMap(value => this.list(1, 20, 1, typeof value === 'object' ? value.Nome || value.Descricao : value)
        .pipe(          
          finalize(() => this.isLoading = false),
          )
        )
      )
      .subscribe(conteudo => this.filtrar(conteudo), 
        error => {
          this.notificationService.notify(JSON.parse(error._body).Mensagem)
      });

  }

  filtrar(conteudo: any){    
    this.opcoesList = conteudo.Dados
    
    this.onChange(null)
      if(conteudo.Dados.length === 1){
        this.onChange(conteudo.Dados[0])
      }      

  }

  displayFn(opcoesList: OpcoesList) {

    if (opcoesList) { 
      if (typeof opcoesList === 'object') {
        return opcoesList.Nome || opcoesList.Descricao
      }
      return opcoesList; 
    }
  }

  /**
   * Write a new value to the element.
   */
  writeValue(obj: any): void {
    //console.log("W: " + obj)

    this.listForm.patchValue({
        opcaoInput: obj
    })
    
  }
  /**
   * Set the function to be called when the control receives a change event.
   */
  registerOnChange(fn: any): void {
    //console.log("C: " + fn)
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

export class OpcoesList {
  Id: number
  Nome: string
  Descricao: string
}