import { Component, OnInit } from '@angular/core';
import { CadastroCrud } from '../../../../shared/cadastro-crud/cadastroCrud';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadosService } from '../estados.service';
import { NotificationService } from '../../../../shared/messages/notification.service';
import { ConfirmacaoService, EnumTipoConfirmacao } from '../../../../shared/messages/confirmacao/confirmacao.service';
import { Estados } from '../estados.model';

@Component({
  selector: 'app-cadastro-estados',
  templateUrl: './cadastro-estados.component.html',
  styleUrls: ['./cadastro-estados.component.css']
})
export class CadastroEstadosComponent extends CadastroCrud implements OnInit {

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private estadosService: EstadosService,
    private notificationService: NotificationService,
    private confirmacaoService: ConfirmacaoService,
    public router: Router) {
      super(router)

      this.rotaNavegacaoLista = "../../estados"
     }


  cadForm: FormGroup              
  estados: Estados = new Estados()  

  ngOnInit() {

    this.estados.Id = parseInt(this.route.snapshot.params['Id'])

    this.cadForm = this.formBuilder.group({
        Id: this.formBuilder.control({value: this.estados.Id, disabled: true}, [Validators.required]),
        Nome: this.formBuilder.control('', [Validators.required]),
        Sigla: this.formBuilder.control('', [Validators.required, Validators.maxLength(2)])    
      })

    if(this.estados.Id){      
        this.estadosService.recuperarPorId(this.estados.Id)
        .subscribe( conteudo=> this.recuperarPorId(conteudo), error => {
        this.notificationService.notify(JSON.parse(error._body).Mensagem)
      })
    }
  }


  recuperarPorId(content: any){

    this.cadForm.setValue({
      Id: content.Content.Dados.Id, 
      Nome: content.Content.Dados.Nome,
      Sigla: content.Content.Dados.Sigla
    });

  }

  isNew(): boolean{
    return this.estados.Id === 0 ? true: false
  }

  save() {    

    var dto = this.cadForm.getRawValue()

    this.estadosService.save(dto)
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

      me.estadosService.remove(me.cadForm.getRawValue())
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
