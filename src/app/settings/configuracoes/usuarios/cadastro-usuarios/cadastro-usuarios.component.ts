import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UsuariosService } from '../usuarios.service';
import { NotificationService } from '../../../../shared/messages/notification.service';
import { Usuarios, EnumTipoUsuariosAdm } from '../usuarios.model';
import { CadastroCrud } from '../../../../shared/cadastro-crud/cadastroCrud';
import { ConfirmacaoService, EnumTipoConfirmacao } from '../../../../shared/messages/confirmacao/confirmacao.service';

@Component({
  selector: 'app-cadastro-usuarios',
  templateUrl: './cadastro-usuarios.component.html',
  styleUrls: ['./cadastro-usuarios.component.css']
})
export class CadastroUsuariosComponent extends CadastroCrud implements OnInit {

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private usuariosService: UsuariosService,
              private notificationService: NotificationService,
              private confirmacaoService: ConfirmacaoService,
              public router: Router) {
                super(router)

                this.rotaNavegacaoLista = "../../usuarios"
               }


  cadForm: FormGroup              
  usuarios: Usuarios = new Usuarios()  

  ngOnInit() {
    
    this.usuarios.Id = parseInt(this.route.snapshot.params['Id'])

    this.cadForm = this.formBuilder.group({
      Id: this.formBuilder.control({value: this.usuarios.Id, disabled: true}, [Validators.required]),
      Nome: this.formBuilder.control('', [Validators.required]),
      Senha: this.formBuilder.control('', [Validators.required]),
      ConfirmarSenha: this.formBuilder.control('', [Validators.required]),
      TipoUsuario: this.formBuilder.control(EnumTipoUsuariosAdm.Comum,),
    }, {validator: CadastroUsuariosComponent.equalsTo})

    if(this.usuarios.Id){      
      this.usuariosService.recuperarPorId(this.usuarios.Id)
        .subscribe( conteudo=> this.recuperarPorId(conteudo), error => {
          this.notificationService.notify(JSON.parse(error._body).Mensagem)
        })
    }
  }

  static equalsTo(group: AbstractControl): {[key:string]: boolean} {
    const senha = group.get('Senha')
    const confirmacaoSenha = group.get('ConfirmarSenha')
    if(!senha || !confirmacaoSenha){
      return undefined
    }
    if(senha.value !== confirmacaoSenha.value){
      return {senhaNaoEIgual:true}
    }
    return undefined
  }

  recuperarPorId(content: any){

    this.cadForm.setValue({
      Id: content.Content.Dados.Id, 
      Nome: content.Content.Dados.Nome,
      Senha: content.Content.Dados.Senha,
      ConfirmarSenha: content.Content.Dados.Senha,
      TipoUsuario: content.Content.Dados.TipoUsuario
    });

  }

  isNew(): boolean{
    return this.usuarios.Id === 0 ? true: false
  }

  save() {    

    var dto = this.cadForm.getRawValue()

    if(this.isNew()){
      dto.TipoUsuario = EnumTipoUsuariosAdm.Comum
    }    

    this.usuariosService.save(dto)
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
      
      me.usuariosService.remove(me.cadForm.getRawValue())
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
