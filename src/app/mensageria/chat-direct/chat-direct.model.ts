export class ChatDirect {
    NomeUsuario: string
    DataHora: Date
    Mensagem: string
    CaminhoFoto: string
}

export enum EnumTipoChatDirect {
    UsuarioLogado = 1,
    OutroUsuario = 2
}