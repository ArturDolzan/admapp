export class ChatDirect {
    UsuarioOrigem: string
    UsuarioDestino: string
    DataHora: Date    
    Mensagem: string
    Visualizado: EnumChatVisualizado
    FotoOrigem: string
    FotoDestino: string
}

export enum EnumChatVisualizado {
    Viualizado = 1,
    NaoVisualizado = 0
}