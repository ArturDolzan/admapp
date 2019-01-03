export class Usuarios {
    Id: number
    Nome: string
    Senha: string
    TipoUsuarios: EnumTipoUsuariosAdm
}

export enum EnumTipoUsuariosAdm {
    Administrador = 1,
    Comum = 2
}