import express, {Request, Response} from 'express'; //will locate express node-modules folder
import bodyParser from 'body-parser'; // checks for mimetype json, converts to JS.
import session from 'express-session';
//import userIdRouter from './routers/userId-router';
import loginRouter from './routers/login-router';
import reimbursementRouter from './routers/reimbursement-router';
import reimbursementStatusRouter from './routers/reimbursementStatus-router';
import reimbursementTypeRouter from './routers/reimbursementType-router';
import { closePool } from './util/pg-connector';
import userRouter from './routers/user-router';
import roleRouter from './routers/role-router';

// creating instance of express App by calling express method
const app = express(); //sets up express
//const port = 3000; 
// Process
const port = process.env.port || 3000;
// Close the pool when app shuts down
/*process.on('SIGINT', async () => {
    await closePool(); 
});  */
/*Middleware
When requests are received by Express they pass thru layers of middleware.  
Essentially, express has an array of middleware functions.
When a request is received  it creates the 'request' and 'response' objects,
then calls the first middleware function with the following parameters;
(request, response, next)
next is the next middleware function
*/
// This middleware will convert a request body of type application json
// to a javascript object and define that at request.body
app.use(bodyParser.json());

//registering middleware
//app.use(/* middleware function */)
// If we want typing: npm install --only-dev @types/express

// session-express code below
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'my-secret',
}));

app.use( (request: Request, response: Response, next) => {
    console.log('Request received for ' + request.url);
    next();
 });

 // another middleware
 app.use( (request: Request, response: Response, next) => {
    //response.json({message: 'Hello from middleware 2'});
    next();
 }); 

 /* Routers - we will register two routers with the routes: 'cats' and 'food'
 We need to remember to register the routes here */
//app.use('/userIds', userIdRouter); //specifies the name called on Postman, like localhost:3000/userIds
app.use('/user', userRouter); //specifies the name called on Postman, like localhost:3000/userIds
app.use('/login', loginRouter);
app.use('/reimbursement', reimbursementRouter) 
app.use('/reimbursementStatus', reimbursementStatusRouter) 
app.use('/reimbursementType', reimbursementTypeRouter) //other files not seeing this.
app.use('/role', roleRouter) //other files not seeing this.

//Below starts server on port 3000 -port is an access point on the server
app.listen(3000, () => {
    console.log(`App started on port ${port}`);
});