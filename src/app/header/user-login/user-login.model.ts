export interface UserLogin {
    Id: number
    Nome: string
    Status: EnumUserLogin
    NomeCompleto: string
    Foto: string
}

export enum EnumUserLogin {
    online = 'online',
    ocupado = 'ocupado',
    offline = 'offline'
}