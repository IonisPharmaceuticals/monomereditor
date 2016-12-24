import {IAttachment} from "./iattachment";

export class IMonomer {
    molfile: string;
    id: number;
    canSMILES: string;
    naturalAnalog: string;
    alternateId: string;
    name: string;
    monomerType: string;
    polymerType: string;
    primary_citation:string = "";
    attachmentList: IAttachment[];
}