import Reimbursement from "../models/Reimbursement";
import ReimbursementStatus from "../models/ReimbursementStatus";
import User from "../models/User";
import Role from "../models/Role";
import db from '../util/pg-connector';


export function createRole(role: Role):
    Promise<Role[]> {
    // enforce business rules
    if (!role.roleId) {
        console.warn('Role requires name');
    }

    // This operation will send a query to the database,
    // which will then return a new promise that includes
    // only the row data

    return db.query(`INSERT INTO role (roleId, role)
    VALUES ($1, $2) RETURNING roleId, role`,
        [role.roleId, role.role])
        .then((data) => {
            return data.rows;
        }).catch((err) => {
            return [];
        });
}

export async function getRoleById(roleId: number): Promise<Role> {
    const result = await db.query(`SELECT roleId, role
        FROM role WHERE roleId = $1`, [roleId]);
    return new Role(result.rows[0]);
}

export async function patchCoalesce(patch: Role) {
    const result = await db.query(`UPDATE role SET roleId = COALESCE($1, roleId), \
role = COALESCE($2, role) WHERE id = $3 \
RETURNING roleId, role;`,
        [patch.roleId, patch.role]);

    if (result.rowCount === 0) {
        // throw error, 404
    } else {
        return result.rows[0];
    }
}


export async function patchRole(patch: Role) {
    if (!patch.roleId) {
        // throw an error
    }

    const currentState = await getRoleById(patch.roleId);
    const newState = {
        ...currentState, ...patch,
    };

    const result = await db.query(`UPDATE role SET RoleId = $1, role = $2 WHERE id = $3 
    RETURNING id, roleId, role;`,
        [newState.roleId, newState.role]);

    if (result.rowCount === 0) {
        // throw error, 404
    } else {
        return result.rows[0];
    }
}