export class Materiais {
    Id: number
    Descricao: string
    Quantidade: number
    ValorUnitario: number
    Observacao: string
    Ativo: EnumMateriaisAtivo
}

export enum EnumMateriaisAtivo {
    Sim = 1,
    Nao = 0
}