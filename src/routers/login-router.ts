import express, {Request, Response,} from 'express';
import User from '../models/User';
import * as userService from '../services/user-service';
const loginRouter = express.Router();

//const userRouter = express.Router();
//userRouter.post('/', (request: Request, response: Response) => {
loginRouter.post('/', (request: Request, response: Response) => {
    const payload = request.body;
    request.session.uid = payload.id;
    request.session.name = payload.name;
    response.sendStatus(201);
});
//userRouter.get('/', (request: Request, response: Response) => {
loginRouter.get('/', (request: Request, response: Response) => {
    response.json({message: `Hello from Login Page ${request.session.name}!`});
});

//export default userRouter;
export default loginRouter;
