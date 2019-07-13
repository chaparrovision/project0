//The Role model is used to track what permissions a user hass

export default class Role {
    roleId: number; // primary key
    role: string // not null, unique 
    
    constructor(obj: {roleId: number; role: string; }) {
        if (!obj) {
            return;
        }
        this.roleId = obj.roleId;
        this.role = obj.role;
    }
}




/*
export default class Role {
    roleId: number; // primary key
    role: string // not null, unique    
    constructor (roleId, role) {
        this.roleId = roleId; // primary key
        this.role = role; // not null, unique
    }   
}
*/