import express, {Request, Response,} from 'express';
import Role from '../models/Role';
import User from '../models/User';
import * as userService from '../services/user-service';
import * as roleService from '../services/role-service';

const roleRouter = express.Router();

/*roleRouter.post('/', (request: Request, response: Response) => {
    const payload = request.body;
    request.session.uid = payload.id;
    request.session.name = payload.name;
    response.sendStatus(201);
});
*/
//roleRouter.get('/', (request: Request, response: Response) => {
    roleRouter.get('/', (request: Request, response: Response) => {
        response.json({message: `Hello from Role Page ${request.session.name}!`});
    });


roleRouter.post('',
    (request: Request, response: Response) => {
        const role = new Role(request.body);

        roleService.createRole(role)
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

roleRouter.get('/:rollId',
    async (request: Request, response: Response) => {
        const id = parseInt(request.params.roleId);

        const item: Role = await roleService.getRoleById(id);

        if (item.roleId) {
            response.status(200).json(item);
        } else {
            response.sendStatus(404);
        }

    });

roleRouter.patch('',
    async (request: Request, response: Response) => {
        const patch: Role = request.body;

        // const patchedInv: Inventory = await inventoryService.patchInventory(patch);
        const patchedInv: Role = await roleService.patchCoalesce(patch);
        
        if (patchedInv.roleId) {
            response.json(patchedInv);
        } else {

        }

        response.sendStatus(200);
    });

roleRouter.delete('/:id',
    (request: Request, response: Response) => {

        response.sendStatus(200);
    });

export default roleRouter;