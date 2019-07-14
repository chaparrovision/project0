import express, {Request, Response,} from 'express';
import User from '../models/User';
import * as userService from '../services/user-service';
import db from '../util/pg-connector';
const loginRouter = express.Router();

//const userRouter = express.Router();
//userRouter.post('/', (request: Request, response: Response) => {
loginRouter.post('/', async(request: Request, response: Response) => {
    const payload = request.body;
    console.log('payload', payload)
    //Here begins the login process in steps
    //1. put user-provided info into variables
    request.session.username = payload.username; //info has arrived  
    request.session.password = payload.password;// info has arrived
    console.log(request.session) 
    // match username var against db
    // prepare varname - query 
    let matchUserNameQuery = `select username, password from users 
                                where username = $1;`;
    // execute varname query
    console.log('matchUserNameQuery', matchUserNameQuery)
    const usernamePasswordResults = await db.query(matchUserNameQuery, [payload.username]); 
    // if False, message bad info
    console.log('usernamePasswordResults', usernamePasswordResults)
    //We have to use .rows[] to get query answers
    if (!usernamePasswordResults.rows[0]) {
        response.status(400).send('You are not in the system.  Try again.')
    };
    
    // true - goto next step
    // put passwords into new variables for ease of reading and comprehension
    const storedPassword = usernamePasswordResults.rows[0].password; //from the db
    const providedPassword = payload.password; // from input
    console.log('provided username and password')
    // match passwords, fail if they don't match
    // post message "welcome user"
    if (storedPassword === providedPassword) {
        response.status(200).send('Welcome User!')
    } else {
        response.status(400).send('Username password combination invalid.  Try again.')
    }
    
    //response.sendStatus(201);
});
//userRouter.get('/', (request: Request, response: Response) => {
loginRouter.get('/', (request: Request, response: Response) => {
    response.json({message: `Hello from Login Page ${request.session.name}!`});  
});


//export default loginRouter;
export default loginRouter;
