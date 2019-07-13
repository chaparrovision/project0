/*
The ReimbursementStatus model is used to track the status of reimbursements. 
Status possibilities are Pending, Approved, or Denied
*/

export default class ReimbursementStatus {
    statusId: number; // primary key
    status: string // not null, unique 
    
    constructor(obj: { statusId: number; status: string; }) {
        if (!obj) {
            return;
        }
        this.statusId = obj.statusId;
        this.status = obj.status;
    }
}
