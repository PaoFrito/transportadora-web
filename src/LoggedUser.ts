import { Grupo } from "./model/enum/Grupo"

export default class LoggedUser{
    private id: number = 4
    private grupo: Grupo = Grupo.ADMINISTRADOR

    public getId(): number{
        return this.id
    }

    public setId(id: number = 4): void{
        this.id = id
    }

    public getGrupo(): Grupo{
        return this.grupo
    }

    public setGrupo(grupo: Grupo = Grupo.ADMINISTRADOR): void{
        this.grupo = grupo
    }
}