import User from "../models/User";
import ReimbursementStatus from "../models/ReimbursementStatus";
import ReimbursementType from "../models/ReimbursementType";
import Role from "../models/Role";
import db from '../util/pg-connector';

export async function getUsers() { //Dylan's code to check connection
    const queryString = `select username from users where firstname = 'Dylan'`;
    //const queryString = `select users.username from users;`;
    //const queryString = `select username, email from users WHERE username in ('samSam', 'jonJon')`;
    //const queryString = `select * from users WHERE username in ('samSam', 'jonJon')`;
    /*const queryString = `select username from users WHERE username like '%d' or 
        username like '%s'`; this works */
    //const queryString = `select * from users`; Dylan's example code
    //select * from cats where fur_color = 'green' or fur_color = 'blue';

    const userResults = await db.query(queryString);
    
    console.log(userResults)
    return userResults;
} 
/*export async function getUser(username, password) { // chappy's code
    const queryString = `select username`
} */


export function createUser(user: User):
    Promise<User[]> {
    // enforce business rules
    if (!user.userId) {
        console.warn('User requires name');
    }

    // This operation will send a query to the database,
    // which will then return a new promise that includes
    // only the row data

    return db.query(`INSERT INTO user (userId, userName, password, firstName, lastName, email, role)
    VALUES ($1, $2) RETURNING userId, userName, password, firstName, lastName, email, role`,
        [user.userId, user.userName])
        .then((data) => {
            return data.rows;
        }).catch((err) => {
            return [];
        });
}

export async function getUserById(userId: number): Promise<User> {
    const result = await db.query(`SELECT userId, userName, password, firstName, lastName,
        email, role
        FROM user WHERE userId = $1`, [userId]);
    return new User(result.rows[0]);
}

export async function patchCoalesce(patch: User) {
    const result = await db.query(`UPDATE users SET userId = COALESCE($1, userId), \
role = COALESCE($2, userName) WHERE id = $3 \
RETURNING userId, userName;`,
        [patch.userId, patch.userName]);

    if (result.rowCount === 0) {
        // throw error, 404
    } else {
        return result.rows[0];
    }
}


export async function patchUser(patch: User) {
    if (!patch.userName) {
        // throw an error
    }

    const currentState = await getUserById(patch.userId);
    const newState = {
        ...currentState, ...patch,
    };

    const result = await db.query(`UPDATE User SET userId = $1, userName = $2 WHERE userId = $3 
    RETURNING userId, userName;`,
        [newState.userId, newState.userName]);

    if (result.rowCount === 0) {
        // throw error, 404
    } else {
        return result.rows[0];
    }
}