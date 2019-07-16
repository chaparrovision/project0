import Reimbursement from "../models/Reimbursement";
import ReimbursementStatus from "../models/ReimbursementStatus";
import ReimbursementType from "../models/ReimbursementType";
//import Role from "../models/Role";
import db from '../util/pg-connector';


//
export function createReimbursement(reimbursement: Reimbursement):
    Promise<Reimbursement[]> {
    // enforce business rules
    if (!reimbursement.reimbursementId) {
        console.warn('Reimbursement item requires an ID');
    }

    // This operation will send a query to the database,
    // which will then return a new promise that includes
    // only the row data

    return db.query(`INSERT INTO reimbursement (author, amount, dateSubmitted, dateResolved, 
        description, resolver, status, type)
    VALUES ($1 $2 $3 $4 $5 $6 $7 $8 $9) RETURNING reimbursementId, author, amount, dateSubmitted, 
        dateResolved, description, resolver, status, type`,
        [reimbursement.author, reimbursement.amount,reimbursement.dateSubmitted, 
            reimbursement.dateResolved, reimbursement.description, reimbursement.resolver,
            reimbursement.status,reimbursement.type])
        .then((data) => {
            return data.rows;
        }).catch((err) => {
            return [];
        });
}

export async function getReimbursementById(ReimbursementId: number): Promise<Reimbursement> {
    const result = await db.query(`SELECT reimbursementId, author, amount, dateSubmiited, 
        dateResolved, description, resolver, status, type
        FROM reimbursement WHERE id = $1`, [ReimbursementId]);
    return new Reimbursement(result.rows[0]);
}

export async function patchCoalesce(patch: Reimbursement) {
    const result = await db.query(`UPDATE reimbursement SET author = COALESCE($1, author), \
amount = COALESCE($2, quantity) WHERE id = $3 \
RETURNING reimbursementId, author, amount;`,
        [patch.reimbursementId, patch.author, patch.amount]);

    if (result.rowCount === 0) {
        // throw error, 404
    } else {
        return result.rows[0];
    }
}


export async function patchReimbursement(patch: Reimbursement) {
    if (!patch.reimbursementId) {
        // throw an error
    }

    const currentState = await getReimbursementById(patch.reimbursementId);
    const newState = {
        ...currentState, ...patch,
    };

    const result = await db.query(`UPDATE inventory SET item_name = $1, quantity = $2 WHERE id = $3 
    RETURNING reimbursementid, author, amount;`,
        [newState.author, newState.amount, newState.reimbursementId]);

    if (result.rowCount === 0) {
        // throw error, 404
    } else {
        return result.rows[0];
    }
}