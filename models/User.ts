import Role from "./Role"
export default class User {
    userId: number; // primary key
    userName: string // not null, unique 
    password: string // not null 
    firstName: string // 
    lastName: string // not null 
    email: string // not null 
    role: string // not null 
    
    constructor(obj) {
        if (!obj) {
            return;
        }
        this.userId = obj.userid;
        this.userName = obj.username;
        this.password = obj.password;
        this.firstName = obj.firstname;
        this.lastName = obj.lastname;
        this.email = obj.email;
        this.role = obj.role;
    }
}


/*
export default class User {
    userId: number;// primary key
    userName: string; // not null, unique 
    password: string; // not null
    firstName: string; // not null
    lastName: string; //not null
    email: string; //not null
    role: Role //not null

    constructor(userId: number, username: string, password: string, firstName: string, 
         lastName:string, email: string, role: Role) {
    this.userId = userId; // primary key
    this.userName = username;  // not null, unique
    this.password = password; // not null
    this.firstName = firstName; // not null
    this.lastName = lastName;  // not null
    this.email = email; // not null
    this.role = role;  // not null
    }
}
*/