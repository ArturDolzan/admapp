export class Materiais {
    Id: number
    Descricao: string
    Quantidade: number
    ValorUnitario: number
    Observacao: string
    Ativo: EnumMateriaisAtivo
}

export enum EnumMateriaisAtivo {
    Ativo = 1,
    Desativado = 0
}