import express, {Request, Response,} from 'express';
import User from '../models/User';
import * as userService from '../services/user-service';
import db from '../util/pg-connector';
import { json } from 'body-parser';

const userRouter = express.Router();

userRouter.post('/', (request: Request, response: Response) => {
    const payload = request.body;
    request.session.uid = payload.id;
    request.session.name = payload.name;
    response.sendStatus(201);
});

// using the below for a GET getUsers
userRouter.get('/', async (request: Request, response: Response) => {
    const returnedValue = await userService.getUsers();      
    console.log(request.session);
    response.json(returnedValue); //returns type, not value
});


//userRouter.get('/', (request: Request, response: Response) => {
userRouter.get('/', async (request: Request, response: Response) => {
    response.json({message: `Hello from user Page`});
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
    
userRouter.get('/:userId', async (request: Request, response: Response) => {
        console.log('are you seeing me?'); //This works to this point
        const id = parseInt(request.params.userId);
        console.log('is this working ', id);
        //const body = request.body; // this was a test
        //console.log(body);
        const item: User = await userService.getUserById(id); //values put in item
        //console.log('Chappy comes from userId ' + id);
        console.log('this is item var', item) //console prints 'item', the correct user
        
        response.status(200).json(item);
        
    }); 



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
/*
userRouter.delete('/:id',
    (request: Request, response: Response) => {

        response.sendStatus(200);
    });
*/
export default userRouter;