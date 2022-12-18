import { StatusFrete } from '../model/enum/StatusFrete';
import { User } from '../model/User';

export class FreteAtualizado {

    id!: number
    statusAtual!: StatusFrete
    executor!: User

}