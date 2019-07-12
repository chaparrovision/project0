import express, {Request, Response,} from 'express';
import Reimbursement from '../models/Reimbursement';
import * as reimbursementStatusService from '../services/reimbursement-service';

const reimbursementStatusRouter = express.Router();
//const loginRouter = express.Router();

/**
 * A router has methods to handle specific http methods
 * Additionally, we could handle all of them using 'all'.
 * HTTP Methods
 * ---
 * GET,POST, PUT, PATCH, DELETE
 */
// Handle the creation of a new cat.  We want to deal strictly with the
//request/response objects here and delegate the internal logic to a 'service'.
 
reimbursementStatusRouter.post('',(request:Request, response:Response) => {
    console.log('Handling post to reimbursementStatus');
    const reimbursementStatus = reimbursementStatusService.createReimbursementStatus(request.body);
        if (reimbursementStatus) {
            response.status(201).json(reimbursementStatus);
        } else {
            response.sendStatus(500);
        }
 });
 
 reimbursementStatusRouter.get('/:id',(request: Request, response:Response) => {
     const id= parseInt(request.params.id);
     console.log('Handling request for Reimbursement with id: ' + id);
     const reimbursementStatusId: Reimbursement = reimbursementStatusService.reimbursementStatusById(id);
     if (reimbursementStatusId) {
         response.json(reimbursementStatusId);
     } else {
         // not found
        response.sendStatus(404);
     }
 });
/* Will work on the below later when a database becomes available.
 userIdRouter.get('',(request: Request, response:Response) => {
    //const id= parseInt(request.params.id);
    console.log('Handling request for all users: ');
    const users: User[]= userIdService.getAllUser();
    if (users) {
        response.json(users);
    } else {
        // not found
       response.sendStatus(404);
    }    
});
*/

export default reimbursementStatusRouter;
