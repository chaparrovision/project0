import express, {Request, Response,} from 'express';
//import Reimbursement from '../models/Reimbursement';
import ReimbursementType from '../models/ReimbursementType';
import * as reimbursementTypeService from '../services/reimbursementType-service';

const reimbursementTypeRouter = express.Router();

reimbursementTypeRouter.post('/', (request: Request, response: Response) => {
    const payload = request.body;
    request.session.uid = payload.id;
    request.session.name = payload.name;
    response.sendStatus(201);
});

//reimbursementTypeRouter.get('/', (request: Request, response: Response) => {
    reimbursementTypeRouter.get('/', (request: Request, response: Response) => {
        response.json({message: `Hello from ReimbursementType Page ${request.session.name}!`});
    });

reimbursementTypeRouter.post('',
    (request: Request, response: Response) => {
        const reimbursementType = new ReimbursementType(request.body);

        reimbursementTypeService.createReimbursementType(reimbursementType)
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

reimbursementTypeRouter.get('/:typeId',
    async (request: Request, response: Response) => {
        const id = parseInt(request.params.id);

        const item: ReimbursementType = await reimbursementTypeService.getReimbursementTypeById(id);

        if (item.typeId) {
            response.status(200).json(item);
        } else {
            response.sendStatus(404);
        }

    });

reimbursementTypeRouter.patch('',
    async (request: Request, response: Response) => {
        const patch: ReimbursementType = request.body;

// const patchedInv: ReimbursementType = await reimbursementTypeService.patchReimbursementType(patch);
        const patchedInv: ReimbursementType = await reimbursementTypeService.patchCoalesce(patch);
        
        if (patchedInv.typeId) {
            response.json(patchedInv);
        } else {

        }

        response.sendStatus(200);
    });

reimbursementTypeRouter.delete('/:id',
    (request: Request, response: Response) => {

        response.sendStatus(200);
    });

export default reimbursementTypeRouter;