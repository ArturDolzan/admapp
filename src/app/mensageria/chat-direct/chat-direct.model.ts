export class ChatDirect {
    UsuarioOrigem: string
    UsuarioDestino: string
    DataHora: Date    
    Mensagem: string
    Visualizado: EnumChatVisualizado
    CaminhoFoto: string
}

export enum EnumChatVisualizado {
    Viualizado = 1,
    NaoVisualizado = 0
}