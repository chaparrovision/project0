/*The Reimbursement model is used to represent a single reimbursement 
that an employee would submit */
export default class Reimbursement {
    reimbursementId: number; // primary key
    author: number; // foreign key -> User, not null    
    amount: number; // not null    
    dateSubmitted: number; // not null    
    dateResolved: number; //
    description: string; // not null
    resolver: number; //foreign key -> User
    status: number;  //foreign key -> ReimbursementStatus, not null
    type: number; // foreign key -> ReimbursementType

    constructor(reimbursementId:number, author:number, amount:number, dateSubmitted:number,
        dateResolved:number, description:string, resolver:number, status:number, type:number)  {
        this.reimbursementId = reimbursementId; // primary key
        this.author = author;  // not null, unique
        this.amount = amount; // not null
        this.dateSubmitted = dateSubmitted; // not null
        this.dateResolved = dateResolved;  // not null
        this.description = description; // not null
        this.resolver = resolver;  // not null
        this.status = status;  // not null
        this.type = type;  // not null
   }
}
