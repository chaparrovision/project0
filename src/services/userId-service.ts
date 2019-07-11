import User from "../models/User";
import Role from "../models/Role"
//let userIdCounter: number = 1;
const userIdMap: Map<Number, User> = new Map();
let adminUser: User = new User(0, 'DAdams', 'password', 'Dylan', 'Adams', 'dadams10642@outlook.com', 
    new Role(0, 'admin'))
let financeManagerUser: User = new User(1, 'DKoenig', 'moneymoney', 'Dylan', 'Koenig', 
    'bigDK@gmail.com', new Role(1, 'finance-manager'))
let firstEmployee: User = new User(2, 'BAdams', 'perfume', 'Becca', 'Adams',  
    'becca.boo@aol.com', new Role(2, 'employee'))
let users: Array<User> = [adminUser, financeManagerUser, firstEmployee];

export function createUserId(userId): User {
    //userId.id = userIdCounter ++;
    // registering key-value pair
    // so later I can retrieve cats by id     
    userIdMap.set(userId.id, userId);
    return userId;
}

export function getUserIdById(id: number) {
    return userIdMap.get(id);
} 
export function getUserById(id) {
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