import { apiPort } from '../settings/settings';
import express from 'express';
import { accountRouter } from '../routes/accountRoutes';
import  {errorHandler}  from '../appError';
import { decodeToken } from '../lib.decodeJWT';
import { userRouter } from '../routes/userRouter';
import { signInUser } from '../controllers/userController';


export const app = express();

// MIDDLEWARES
app.use(express.json());

app.route('/login').post(signInUser);

// After this line routes are expected to be authenticated
app.use( decodeToken );

// ROUTES
app.use('/users', userRouter);
app.use('/accounts', accountRouter);

app.all('*', () => {
    throw new Error('WrongUrl')
});

app.use( '*',  errorHandler);

// START SERVER
app.listen(apiPort, () => {
    console.log(`server started at http://localhost:${apiPort}`);
});