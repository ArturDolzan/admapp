export class Chat {
    NomeUsuario: string
    DataHora: Date
    Mensagem: string
    CaminhoFoto: string
}

export enum EnumTipoChat {
    UsuarioLogado = 1,
    OutroUsuario = 2
}