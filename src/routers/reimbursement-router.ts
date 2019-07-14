import express, {Request, Response,} from 'express';
import Reimbursement from '../models/Reimbursement';
import * as reimbursementService from '../services/reimbursement-service';
//import ReimbursementStatus from '../models/ReimbursementStatus';
//import * as reimbursementStatusService from '../services/reimbursementStatus-service';

const reimbursementRouter = express.Router();

reimbursementRouter.post('/', (request: Request, response: Response) => {
    const payload = request.body;
    request.session.uid = payload.id;
    request.session.name = payload.name;
    response.sendStatus(201);
});
//reimbursementRouter.get('/', (request: Request, response: Response) => {
    reimbursementRouter.get('/', (request: Request, response: Response) => {
        response.json({message: `Hello from Reimbursement Page ${request.session.name}!`});
    });

reimbursementRouter.post('',
    (request: Request, response: Response) => {
        const reimbursement = new Reimbursement(request.body);

        reimbursementService.createReimbursement(reimbursement)
            // This handler receives the row data
            // from the service method
            .then((rows) => {
                if (rows.length > 0) {
                    response.status(201).json(rows[0]);
                } else {
                    response.sendStatus(400);
                }
            });
    });

reimbursementRouter.get('/:reimbursementId',
    async (request: Request, response: Response) => {
        const id = parseInt(request.params.statusId);

        const item: Reimbursement = await reimbursementService.getReimbursementById(id);

        if (item.reimbursementId) {
            response.status(200).json(item);
        } else {
            response.sendStatus(404);
        }

    });

reimbursementRouter.patch('',
    async (request: Request, response: Response) => {
        const patch: Reimbursement = request.body;

        // const patchedInv: Inventory = await inventoryService.patchInventory(patch);
        const patchedInv: Reimbursement = await reimbursementService.patchCoalesce(patch);
        
        if (patchedInv.reimbursementId) {
            response.json(patchedInv);
        } else {

        }

        response.sendStatus(200);
    });

reimbursementRouter.delete('/:id',
    (request: Request, response: Response) => {

        response.sendStatus(200);
    });

export default reimbursementRouter;