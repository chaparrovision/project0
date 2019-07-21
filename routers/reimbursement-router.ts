import express, {Request, Response,} from 'express';
import Reimbursement from '../models/Reimbursement';
import * as reimbursementService from '../services/reimbursement-service';
import db from '../util/pg-connector';
const reimbursementRouter = express.Router();

reimbursementRouter.post('/', async(req: Request, response: Response) => {
    const payload = req.body; //retrieves json text input from user
    console.log('payload', payload)
    const newReimbursement:Reimbursement = await reimbursementService.createReimbursement(payload);
    response.json(newReimbursement);
});  
    
//reimbursementRouter.get('/', (request: Request, response: Response) => {
    reimbursementRouter.get('/status/:statusId',
    async (request: Request, response: Response) => {
        if (request.session.role <= 1)  {
            response.sendStatus(403);
        } else {
            const id = parseInt(request.params.statusId);

            const item: Reimbursement[] = await reimbursementService.getReimbursementByStatusId(id);

            if (item.length) {
                response.status(200).json(item);
            } else {
                response.sendStatus(404);
            }
    }
    });

//reimbursementRouter.get('/', (request: Request, response: Response) => {
    reimbursementRouter.get('/type/:typeId',
    async (request: Request, response: Response) => {
        if (request.session.role <= 1)  {
            response.sendStatus(403);
        } else {
            const id = parseInt(request.params.typeId);
            const item: Reimbursement[] = await reimbursementService.getReimbursementByTypeId(id);
            if (item.length) {
                response.status(200).json(item);
            } else {
                response.sendStatus(404);
            }
        }
    });

// reimbursementRouter.post('',
//     (request: Request, response: Response) => {
//         const reimbursement = new Reimbursement(request.body);

//         reimbursementService.createReimbursement(reimbursement)
//             // This handler receives the row data
//             // from the service method
//             .then((rows) => {
//                 if (rows.length > 0) {
//                     response.status(201).json(rows[0]);
//                 } else {
//                     response.sendStatus(400);
//                 }
//             });
//     });


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