import { AbstractEntity } from "./AbstractEntity"
import { StatusFrete } from "./enum/StatusFrete"
import { User } from "./User"
import { Frete } from './Frete'

export class HistoricoFrete extends AbstractEntity{

    frete!: Frete
    statusFrete!: StatusFrete
    executor!: User
        
}