import { Component, OnInit, Input, Inject } from '@angular/core';
import { Materiais } from '../materiais.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MateriaisService } from '../materiais.service';
import { NotificationService } from '../../shared/messages/notification.service';
import { RadioOption } from 'src/app/shared/radio/radio-option.model';
import { markDirtyIfOnPush } from '@angular/core/src/render3/instructions';
import { pairwise, map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-cadastro-materiais',
  templateUrl: './cadastro-materiais.component.html',
  styleUrls: ['./cadastro-materiais.component.css']
})


export class CadastroMateriaisComponent implements OnInit {

  cadForm: FormGroup

  @Input() data:  Materiais

  opcoesAtivo: RadioOption[] = [
    {label: 'Ativo', value: 1},
    {label: 'Desativado', value: 0}
  ]

  decimalPattern = /^[1-9]\d*(\.\d+)?$/
  numberPattern = /^[0-9]*$/

  constructor(private formBuilder: FormBuilder, 
              private dialogRef: MatDialogRef<CadastroMateriaisComponent>,
              private materiaisService: MateriaisService,
              private notificationService: NotificationService,
              @Inject(MAT_DIALOG_DATA) data) { 

                 this.data = data;

              }

  ngOnInit() {

    this.cadForm = this.formBuilder.group({
      Id: this.formBuilder.control({value: this.data.Id, disabled: true}, [Validators.required]),
      Ativo: this.formBuilder.control(this.data.Ativo, [Validators.required]),
      Descricao: this.formBuilder.control(this.data.Descricao, [Validators.required]),
      Quantidade: this.formBuilder.control(this.data.Quantidade, [Validators.required, Validators.pattern(this.numberPattern)]),
      ValorUnitario: this.formBuilder.control(this.data.ValorUnitario, [Validators.required, Validators.pattern(this.decimalPattern)]),
      Observacao: this.formBuilder.control(this.data.Observacao)
    })

    /*this.cadForm.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      pairwise(),
      map(([oldState, newState]) => {
          let changes = {};
          for (const key in newState) {
            if (oldState[key] !== newState[key] && 
                oldState[key] !== undefined) {
              changes[key] = newState[key];
            }
          }
          return changes;
        }),
        filter(changes => Object.keys(changes).length !== 0 )
      ).subscribe(
        value => {
          console.log("Form has changed:", value);
        }
      );*/

      this.cadForm.controls['Descricao'].valueChanges.pipe(
        debounceTime(200),
        distinctUntilChanged()
      ).subscribe( data => {
        console.log('Descricao alterada: ' + data)
      })
    
  }

  change(event){
    debugger
  }

  isNew(): boolean{
    return this.data.Id === 0 ? true: false
  }

  save() {

    this.materiaisService.save(this.cadForm.getRawValue())
        .subscribe(response => {
          
          this.notificationService.notify(response.Mensagem)

          this.dialogRef.close({data: this.cadForm.getRawValue(), isSaved: true, isRemoved: false})
        }, error => {
          this.notificationService.notify(JSON.parse(error._body).Mensagem)
        })
  }

  remove() {
    
    this.materiaisService.remove(this.cadForm.getRawValue())
    .subscribe(response => {
      
      this.notificationService.notify(response.Mensagem)

      this.dialogRef.close({data: this.cadForm.getRawValue(), isSaved: false, isRemoved: true})
    }, error => {
      this.notificationService.notify(JSON.parse(error._body).Mensagem)
    })    
  }

  close() {
      this.dialogRef.close({isSaved: false, isRemoved: false});
  }  
}
