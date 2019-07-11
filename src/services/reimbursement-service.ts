import Reimbursement from "../models/Reimbursement";
//import Role from "../models/Role";
//let userIdCounter: number = 1;
const reimbursementUserMap: Map<Number, Reimbursement> = new Map();
/* Dylan's database went here, in the form of let variables for each role array, 
then the combined array, which was named 'users'.
*/
export function createReimbursementUser(reimbursementUser): Reimbursement {
    // registering key-value pair
    // so later I can retrieve by?   
    reimbursementUserMap.set(reimbursementUser.id, reimbursementUser);
    return reimbursementUser;
}

export function reimbursementUserById(id: number) {
    return reimbursementUserMap.get(id);
} 
//reimbursementUserService
/*
export function getReimbursementById(id) {
    const result = users.find((v) => {
        return v.userId == id;
    });
    return result;
}

export function getAllUser() {
    return users;
}

export function getLogin(userName, password) {
    const result = users.find((v) => {
        return v.userId == userName && password;
    });
    return result;
}
//export function getAllUser() {  //
    //return users;
*/