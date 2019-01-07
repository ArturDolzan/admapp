import { Component, OnInit, Input, Inject } from '@angular/core';
import { Materiais, EnumMateriaisAtivo } from '../materiais.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MateriaisService } from '../materiais.service';
import { NotificationService } from '../../shared/messages/notification.service';
import { markDirtyIfOnPush } from '@angular/core/src/render3/instructions';
import { pairwise, map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CadastroCrud } from '../../shared/cadastro-crud/cadastroCrud';
import { Router, ActivatedRoute } from '@angular/router';
import { RadioOption } from '../../shared/radio/radio-option.model';
import { ConfirmacaoService, EnumTipoConfirmacao } from '../../shared/messages/confirmacao/confirmacao.service';

@Component({
  selector: 'app-cadastro-materiais',
  templateUrl: './cadastro-materiais.component.html',
  styleUrls: ['./cadastro-materiais.component.css']
})


export class CadastroMateriaisComponent extends CadastroCrud implements OnInit {

  decimalPattern = /^[1-9]\d*(\.\d+)?$/
  numberPattern = /^[0-9]*$/

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private materiaisService: MateriaisService,
    private notificationService: NotificationService,
    private confirmacaoService: ConfirmacaoService,
    public router: Router) {
      super(router)

      this.rotaNavegacaoLista = "../../materiais"
     }


    cadForm: FormGroup              
    materiais: Materiais = new Materiais()  

    opcoesAtivo: RadioOption[] = [
      {label: 'Ativo', value: 1},
      {label: 'Desativado', value: 0}
    ]

  ngOnInit() {

    this.materiais.Id = parseInt(this.route.snapshot.params['Id'])

    this.cadForm = this.formBuilder.group({
      Id: this.formBuilder.control({value: this.materiais.Id, disabled: true}, [Validators.required]),
      Ativo: this.formBuilder.control(EnumMateriaisAtivo.Sim, [Validators.required]),
      Descricao: this.formBuilder.control('', [Validators.required]),
      Quantidade: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      ValorUnitario: this.formBuilder.control('', [Validators.required, Validators.pattern(this.decimalPattern)]),
      Observacao: this.formBuilder.control('')
    })

    if(this.materiais.Id){      
      this.materiaisService.recuperarPorId(this.materiais.Id)
        .subscribe( conteudo=> this.recuperarPorId(conteudo), error => {
          this.notificationService.notify(JSON.parse(error._body).Mensagem)
        })
    }

  }

  recuperarPorId(content: any){

    this.cadForm.setValue({
      Id: content.Content.Dados.Id, 
      Ativo: content.Content.Dados.Ativo,
      Descricao: content.Content.Dados.Descricao,
      Quantidade: content.Content.Dados.Quantidade,
      ValorUnitario: content.Content.Dados.ValorUnitario,
      Observacao: content.Content.Dados.Observacao
    });

  }


  isNew(): boolean{
    return this.materiais.Id === 0 ? true: false
  }

  save() {    

    var dto = this.cadForm.getRawValue()

    if(this.isNew()){
      dto.Ativo = EnumMateriaisAtivo.Sim
    }    

    this.materiaisService.save(dto)
        .subscribe(response => {
          
          this.notificationService.notify(response.Mensagem)

          this.navegarParaLista()
        }, error => {
          this.notificationService.notify(JSON.parse(error._body).Mensagem)
        })
  }
  
  remove() {
    let me = this

    this.confirmacaoService.confirm("Deseja realmente remover?", "Pergunta", EnumTipoConfirmacao.Pergunta ,function(){
      
      me.materiaisService.remove(me.cadForm.getRawValue())
        .subscribe(response => {
          
          me.notificationService.notify(response.Mensagem)

          me.navegarParaLista()
        }, error => {
          me.notificationService.notify(JSON.parse(error._body).Mensagem)
        })
    },function(){
      
    })
  }
}
