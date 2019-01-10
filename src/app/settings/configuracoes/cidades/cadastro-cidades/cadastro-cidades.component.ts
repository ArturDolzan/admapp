import { Component, OnInit } from '@angular/core';
import { CadastroCrud } from '../../../../shared/cadastro-crud/cadastroCrud';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CidadesService } from '../cidades.service';
import { NotificationService } from '../../../../shared/messages/notification.service';
import { ConfirmacaoService, EnumTipoConfirmacao } from '../../../../shared/messages/confirmacao/confirmacao.service';
import { Cidades } from '../cidades.model';

@Component({
  selector: 'app-cadastro-cidades',
  templateUrl: './cadastro-cidades.component.html',
  styleUrls: ['./cadastro-cidades.component.css']
})
export class CadastroCidadesComponent extends CadastroCrud implements OnInit {

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private cidadesService: CidadesService,
    private notificationService: NotificationService,
    private confirmacaoService: ConfirmacaoService,
    public router: Router) {
      super(router)

      this.rotaNavegacaoLista = "../../cidades"
     }


  cadForm: FormGroup        
  cidades: Cidades = new Cidades()  

  ngOnInit() {

    this.cidades.Id = parseInt(this.route.snapshot.params['Id'])

    this.cadForm = this.formBuilder.group({
        Id: this.formBuilder.control({value: this.cidades.Id, disabled: true}, [Validators.required]),
        Nome: this.formBuilder.control('', [Validators.required]),
        CodigoEstado: this.formBuilder.control(''),
        Populacao2010: this.formBuilder.control('', [Validators.required]),
        DensidadeDemo: this.formBuilder.control('', [Validators.required]),
        CodigoIbge: this.formBuilder.control('', [Validators.required]),
        Gentilico: this.formBuilder.control('', [Validators.required]),
        Area: this.formBuilder.control('', [Validators.required]),
        Estado: this.formBuilder.control('', [Validators.required])
    })

    if(this.cidades.Id){      
        this.cidadesService.recuperarPorId(this.cidades.Id, ["Estados"])
        .subscribe( conteudo=> this.recuperarPorId(conteudo), error => {
        this.notificationService.notify(JSON.parse(error._body).Mensagem)
      })
    }
  }


  recuperarPorId(content: any){

    this.cadForm.setValue({
      Id: content.Content.Dados.Id, 
      Nome: content.Content.Dados.Nome,
      CodigoEstado: content.Content.Dados.CodigoEstado,
      DensidadeDemo: content.Content.Dados.DensidadeDemo,
      CodigoIbge: content.Content.Dados.CodigoIbge,
      Populacao2010: content.Content.Dados.Populacao2010,
      Gentilico: content.Content.Dados.Gentilico,
      Area: content.Content.Dados.Area,
      Estado: content.Content.Dados.Estados
    });

  }

  isNew(): boolean{
    return this.cidades.Id === 0 ? true: false
  }

  save() {    

    var dto = this.cadForm.getRawValue()
    dto.CodigoEstado = dto.Estado.Id

    this.cidadesService.save(dto)
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

      me.cidadesService.remove(me.cadForm.getRawValue())
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
