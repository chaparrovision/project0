import express, {Request, Response,} from 'express';
import Reimbursement from '../models/Reimbursement';
import ReimbursementStatus from '../models/ReimbursementStatus';
import Role from '../models/Role';
import * as reimbursementStatusService from '../services/reimbursementStatus-service';

const reimbursementStatusRouter = express.Router();

reimbursementStatusRouter.post('/', (request: Request, response: Response) => {
    const payload = request.body;
    request.session.uid = payload.id;
    request.session.name = payload.name;
    response.sendStatus(201);
});

//reimbursementStatusRouter.get('/', (request: Request, response: Response) => {
    reimbursementStatusRouter.get('/', (request: Request, response: Response) => {
        response.json({message: `Hello from ReimbursementStatus Page ${request.session.name}!`});
    });

reimbursementStatusRouter.post('',
    (request: Request, response: Response) => {
        const reimbursementStatus = new ReimbursementStatus(request.body);

        reimbursementStatusService.createReimbursementStatus(reimbursementStatus)
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

reimbursementStatusRouter.get('/:statusId',
    async (request: Request, response: Response) => {
        const id = parseInt(request.params.statusId);

        const item: ReimbursementStatus = await reimbursementStatusService.getReimbursementStatusById(id);

        if (item.statusId) {
            response.status(200).json(item);
        } else {
            response.sendStatus(404);
        }

    });

reimbursementStatusRouter.patch('',
    async (request: Request, response: Response) => {
        const patch: ReimbursementStatus = request.body;

        // const patchedInv: Inventory = await inventoryService.patchInventory(patch);
        const patchedInv: ReimbursementStatus = await reimbursementStatusService.patchCoalesce(patch);
        
        if (patchedInv.statusId) {
            response.json(patchedInv);
        } else {

        }

        response.sendStatus(200);
    });

reimbursementStatusRouter.delete('/:id',
    (request: Request, response: Response) => {

        response.sendStatus(200);
    });

export default reimbursementStatusRouter;