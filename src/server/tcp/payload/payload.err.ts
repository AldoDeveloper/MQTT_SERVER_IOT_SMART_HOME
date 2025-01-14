
export default class PayloadErrorTCP{
    
    type    : string = "err"
    message : string = "Error Request!"
    code    : number = 3
    errors  : any;

    public constructor(partial: Partial<Record<string, any>>){
        Object.assign(this, partial);
    }

    public toJson() : string {
        return JSON.stringify(this);
    }
}