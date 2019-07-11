import express, {Request, Response,} from 'express';
import User from '../models/User';
import * as userIdService from '../services/userId-service';

//const userIdRouter = express.Router();
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
 
loginRouter.post('',(request:Request, response:Response) => {
    console.log('Handling post to userId');
    const userId = userIdService.createUserId(request.body);
        if (userId) {
            response.status(201).json(userId);
        } else {
            response.sendStatus(500);
        }
 });
 
 loginRouter.get('/:login',(request: Request, response:Response) => {
     const login= parseInt(request.params.login);
     console.log('Handling request for login: ' + login);
     const userId: User = userIdService.getUserById(login);
     if (userId) {
         response.json(userId);
     } else {
         // not found
        response.sendStatus(404);
     }
 });

 loginRouter.get('',(request: Request, response:Response) => {
    //const id= parseInt(request.params.id);
    console.log('Handling request for login: ');
    const users: User[]= userIdService.getAllUser();
    if (users) {
        response.json(users);
    } else {
        // not found
       response.sendStatus(404);
    }    
});


export default loginRouter;
