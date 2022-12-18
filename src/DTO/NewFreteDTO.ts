import { Caminhao } from "../model/Caminhao"
import { Cidade } from "../model/Cidade"
import { User } from "../model/User"
import { Produto } from '../model/Produto'

export class NewFreteDTO {

    produto!: Produto
    cidadeOrigem!: Cidade
    cidadeDestino!: Cidade
    motorista!: User
    caminhao!: Caminhao
    precoTonelada: number = 0 
    executor !: User
    
}