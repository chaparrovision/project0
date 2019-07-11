import express, {Request, Response,} from 'express';
import User from '../models/User';
import * as userIdService from '../services/userId-service';

const userIdRouter = express.Router();
const loginRouter = express.Router();

/**
 * A router has methods to handle specific http methods
 * Additionally, we could handle all of them using 'all'.
 * HTTP Methods
 * ---
 * GET,POST, PUT, PATCH, DELETE
 */
// Handle the creation of a new cat
//We want to deal strictly with the request/response objects here
// and delegate the internal logic to a 'service'.
 
userIdRouter.post('',(request:Request, response:Response) => {
    console.log('Handling post to userId');
    const userId = userIdService.createUserId(request.body);
        if (userId) {
            response.status(201).json(userId);
        } else {
            response.sendStatus(500);
        }
 });
 
 userIdRouter.get('/:id',(request: Request, response:Response) => {
     const id= parseInt(request.params.id);
     console.log('Handling request for userId with id: ' + id);
     const userId: User = userIdService.getUserById(id);
     if (userId) {
         response.json(userId);
     } else {
         // not found
        response.sendStatus(404);
     }
 });

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


export default userIdRouter;
