import { Estados } from "../estados/estados.model";

export class Cidades {
    Id: number
    Nome: string
    CodigoEstado: number
    Populacao2010: number
    DensidadeDemo: number
    Gentilico: string
    Area: number
    Estados: Estados
}