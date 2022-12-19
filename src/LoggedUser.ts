export default class LoggedUser{
    private id: number = 4

    public getId(): number{
        return this.id
    }

    public setId(id: number = 4): void{
        this.id = id
    }
}