import Reimbursement from "../models/Reimbursement";
import ReimbursementStatus from "../models/ReimbursementStatus";
//import Role from "../models/Role";
import db from '../util/pg-connector';


export function createReimbursementStatus(reimbursementStatus: ReimbursementStatus):
    Promise<ReimbursementStatus[]> {
    // enforce business rules
    if (!reimbursementStatus.status) {
        console.warn('Reimbursement status requires name');
    }

    // This operation will send a query to the database,
    // which will then return a new promise that includes
    // only the row data

    return db.query(`INSERT INTO reimbursementStatus (statusId, status)
    VALUES ($1, $2) RETURNING statusId, status`,
        [reimbursementStatus.statusId, reimbursementStatus.status])
        .then((data) => {
            return data.rows;
        }).catch((err) => {
            return [];
        });
}
//Below is code from user-service for getUserById.  Below that is template code/
export async function getReimbursementStatusById(statusId: number): Promise<ReimbursementStatus> {
    const result = await db.query(`SELECT statusId "statusId", status
        FROM reimbursementStatus WHERE statusId = $1`, [statusId]);
    return new ReimbursementStatus(result.rows[0]);
}

export async function patchCoalesce(patch: ReimbursementStatus) {
    const result = await db.query(`UPDATE reimbursementStatus SET statusId = COALESCE($1, statusId), \
status = COALESCE($2, status) WHERE id = $3 \
RETURNING statusId "statusId", status;`,
        [patch.statusId, patch.status]);

    if (result.rowCount === 0) {
        // throw error, 404
    } else {
        return result.rows[0];
    }
}


export async function patchReimbursementStatus(patch: ReimbursementStatus) {
    if (!patch.statusId) {
        // throw an error
    }

    const currentState = await getReimbursementStatusById(patch.statusId);
    const newState = {
        ...currentState, ...patch,
    };

    const result = await db.query(`UPDATE reimbursementStatus SET statusId = $1, status = $2 WHERE id = $3 
    RETURNING id, statusId "statusId", status;`,
        [newState.statusId, newState.status, newState.statusId]);

    if (result.rowCount === 0) {
        // throw error, 404
    } else {
        return result.rows[0];
    }
}