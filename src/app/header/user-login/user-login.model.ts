export interface UserLogin {
    Id: number
    Nome: string
    Status: EnumUserLogin
}

export enum EnumUserLogin {
    online = 'online',
    ocupado = 'ocupado',
    offline = 'offline'
}