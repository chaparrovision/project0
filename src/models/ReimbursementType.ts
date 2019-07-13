/*
The ReimbursementType model is used to track what kind of 
reimbursement is being submitted. Type possibilities are 
Lodging, Travel, Food, or Other.
*/

export default class ReimbursementType {
    typeId: number; // primary key
    type: string // not null, unique 
    
    constructor(obj: { typeId: number; type: string; }) {
        if (!obj) {
            return;
        }
        this.typeId = obj.typeId;
        this.type = obj.type;
    }
}