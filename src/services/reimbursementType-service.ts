import Reimbursement from "../models/Reimbursement";
import ReimbursementType from "../models/ReimbursementType";
//import Role from "../models/Role";
import db from '../util/pg-connector';


export function createReimbursementType(reimbursementType: ReimbursementType):
    Promise<ReimbursementType[]> {
    // enforce business rules
    if (!reimbursementType.type) {
        console.warn('Reimbursement type requires name');
    }

    // This operation will send a query to the database,
    // which will then return a new promise that includes
    // only the row data

    return db.query(`INSERT INTO reimbursementType (typeId, type)
    VALUES ($1, $2) RETURNING typeId, type`,
        [reimbursementType.typeId, reimbursementType.type])
        .then((data) => {
            return data.rows;
        }).catch((err) => {
            return [];
        });
}

export async function getReimbursementTypeById(typeId: number): Promise<ReimbursementType> {
    const result = await db.query(`SELECT typeId "typeId", type
        FROM reimbursementType WHERE typeId = $1`, [typeId]);
    return new ReimbursementType(result.rows[0]);
}

export async function patchCoalesce(patch: ReimbursementType) {
    const result = await db.query(`UPDATE reimbursementType SET typeId = COALESCE($1, typeId), \
type = COALESCE($2, type) WHERE id = $3 \
RETURNING typeId "typeId", type;`,
        [patch.typeId, patch.type]);

    if (result.rowCount === 0) {
        // throw error, 404
    } else {
        return result.rows[0];
    }
}


export async function patchReimbursementType(patch: ReimbursementType) {
    if (!patch.typeId) {
        // throw an error
    }

    const currentState = await getReimbursementTypeById(patch.typeId);
    const newState = {
        ...currentState, ...patch,
    };

    const result = await db.query(`UPDATE reimbursementType SET typeId = $1, type = $2 WHERE id = $3 
    RETURNING typeId "typeId", type;`,
        [newState.typeId, newState.type, newState.typeId]);

    if (result.rowCount === 0) {
        // throw error, 404
    } else {
        return result.rows[0];
    }
}