export class Chat {
    IdUsuario: number
    NomeUsuario: string
    TipoChat: EnumTipoChat
    DataHora: Date
    Mensagem: string
    CaminhoFoto: string
}

export enum EnumTipoChat {
    UsuarioLogado = 1,
    OutroUsuario = 2
}