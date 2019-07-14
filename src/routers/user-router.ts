import express, {Request, Response,} from 'express';
import User from '../models/User';
import * as userService from '../services/user-service';

const userRouter = express.Router();

userRouter.post('/', (request: Request, response: Response) => {
    const payload = request.body;
    request.session.uid = payload.id;
    request.session.name = payload.name;
    response.sendStatus(201);
});

//userRouter.get('/', (request: Request, response: Response) => {
    userRouter.get('/', async (request: Request, response: Response) => {
        response.json({message: `Hello from user Page ${request.session.name}!`});
        await userService.getUsers();
    });

userRouter.post('',
    (request: Request, response: Response) => {
        const user = new User(request.body);

        userService.createUser(user)
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
    
userRouter.get('/:userId',
    async (request: Request, response: Response) => {
        const id = parseInt(request.params.userId);

        const item: User = await userService.getUserById(id);

        if (item.userId) {
            response.status(200).json(item);
        } else {
            response.sendStatus(404);
        }

    });

/* userRouter.get(`/:userName`, //chappy's code
    async (request: Request, response: Response) => {
        const usn = parseInt(request.params.userName);
        const item = User = await userService.getUserById(usn);
        if ()
    }
) */

userRouter.patch('',
    async (request: Request, response: Response) => {
        const patch: User = request.body;

        // const patchedInv: Inventory = await inventoryService.patchInventory(patch);
        const patchedInv: User = await userService.patchCoalesce(patch);
        
        if (patchedInv.userId) {
            response.json(patchedInv);
        } else {

        }
        response.sendStatus(200);
    });

userRouter.delete('/:id',
    (request: Request, response: Response) => {

        response.sendStatus(200);
    });

export default userRouter;