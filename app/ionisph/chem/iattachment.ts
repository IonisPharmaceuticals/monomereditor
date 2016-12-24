

export class IAttachment {

    alternateId:string;
    capGroupName:string;
    capGroupSMILES:string;
    id:number;
    label:string;

    constructor(altid:string)
    {
        this.alternateId = altid;
    }
}