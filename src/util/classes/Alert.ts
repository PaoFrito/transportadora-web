export default class Alert{
    private error: boolean = false
    private success: boolean = false
    private msg: string = ""

    public getMsg(): string{
        return this.msg
    }

    public getError(): boolean{
        return this.error
    }

    public getSuccess(): boolean{
        return this.success
    }

    public showPopUp(SorE: boolean, msg: string): void{
        this.msg = msg
        if(SorE) this.success = true
        else this.error = true

        setTimeout(() => {
            this.success = false
            this.error = false
        }, 5000)
    }
}