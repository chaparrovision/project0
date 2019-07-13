/*The Reimbursement model is used to represent a single reimbursement 
that an employee would submit */
export default class Reimbursement {
    reimbursementId: number; // primary key
    author: number // not null, unique 
    amount: number // not null
    dateSubmitted: number // not null
    dateResolved: number // not null
    description: string // not null
    resolver: number // not null
    status: number // not null
    type: number // not null
    
    constructor(obj: { reimbursementId:number, author:number, amount:number, dateSubmitted:number,
        dateResolved:number, description:string, resolver:number, status:number, type:number; }) {
        if (!obj) {
            return;
        }
        this.reimbursementId = obj.reimbursementId;//primary key
        this.author = obj.author; //not null unique
        this.amount = obj.amount; //not null 
        this.dateSubmitted = obj.dateSubmitted; //not null 
        this.dateResolved = obj.dateResolved; //not null 
        this.description = obj.description; //not null 
        this.resolver = obj.resolver; //not null 
        this.status = obj.status; //not null 
        this.type = obj.type; //not null 
    }
}
