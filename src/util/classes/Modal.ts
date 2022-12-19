export default class Modal{
    state: boolean = false

    public getState(): boolean{
        return this.state
    }

    public switchState(): void{
        this.state = !this.state
    }

    public closeModal(): void{
        this.state = false
    }

    public openModal(): void{
        this.state = true
    }
}