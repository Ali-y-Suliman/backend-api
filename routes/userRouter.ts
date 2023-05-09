import express from 'express';
import { bcryptPassword, checkDuplicatedEmails, checkPostedUserPayload, deleteUserByEmail, getUserByEmail, getAllUsers, patchUserByEmail, postUser } from '../controllers/userController';
import { checkIfAdmin } from '../controllers/middelwares.ts/roles.middelwares';

export const userRouter = express.Router();

userRouter
.route('/')
.get(getAllUsers)
.post(checkIfAdmin, checkDuplicatedEmails, checkPostedUserPayload, bcryptPassword, postUser);

userRouter
.route('/:email')
.get(getUserByEmail)
.patch(checkIfAdmin, checkDuplicatedEmails, patchUserByEmail)
.delete(checkIfAdmin, deleteUserByEmail);