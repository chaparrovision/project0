import Reimbursement from "../models/Reimbursement";
import ReimbursementStatus from "../models/ReimbursementStatus";
import ReimbursementType from "../models/ReimbursementType";
//import Role from "../models/Role";
import db from '../util/pg-connector';


//
export async function createReimbursement(reimbursement: Reimbursement):
    Promise<Reimbursement> {
    // enforce business rules
    // This operation will send a query to the database, which will then return
    // a new promise that includes only the row data
    const result = await db.query(`INSERT INTO reimbursements (author, amount, datesubmitted, dateresolved, 
        description, resolver, status, type)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING reimbursementid, author, amount, datesubmitted, 
        dateresolved, description, resolver, status, type`,
        [reimbursement.author, reimbursement.amount,reimbursement.dateSubmitted, 
            reimbursement.dateResolved, reimbursement.description, reimbursement.resolver,
            reimbursement.status,reimbursement.type]);
    const newReimbursement:Reimbursement = new Reimbursement(result.rows[0]);
    return newReimbursement;
}

export async function getReimbursementByStatusId(StatusId: number): Promise<Reimbursement[]> {
    const result = await db.query(`SELECT reimbursementid, author, amount, dateSubmitted, 
        dateResolved, description, resolver, status, type
        FROM reimbursements WHERE status = $1`, [StatusId]);
        console.log(result.rows);
    return  result.rows;
}
export async function getReimbursementByTypeId(TypeId: number): Promise<Reimbursement[]> {
    const result = await db.query(`SELECT reimbursementid, author, amount, dateSubmitted, 
        dateResolved, description, resolver, status, type
        FROM reimbursements WHERE type = $1`, [TypeId]);
        console.log(result.rows);
    return result.rows;
}

export async function patchCoalesce(patch: Reimbursement) {
    const result = await db.query(`UPDATE reimbursements SET author = COALESCE($1, author), \
    amount = COALESCE($2, amount), datesubmitted = COALESCE($3, datesubmitted),\
    dateresolved = COALESCE($4, dateresolved), description = COALESCE($5, description),\
     resolver = COALESCE($6, resolver), status = COALESCE($7, status), type = COALESCE($8, type)  \
     WHERE reimbursementid = $9 \
    RETURNING author, amount, datesubmitted, dateresolved, description, resolver, status, type;`,
        [patch.author, patch.amount, patch.dateSubmitted, patch.dateResolved, patch.description,
             patch.resolver, patch.status, patch.type, patch.reimbursementId]);

    if (result.rowCount === 0) {
        // throw error, 404
    } else {
        return result.rows[0];
    }
}