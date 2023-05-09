import express from 'express';
import { bcryptPassword, checkBirthDateFormate, checkDuplicatedEmails, checkPostedAccountPayload, deleteAccountByEmail, getAccountByEmail, getAllAccounts, patchAccountByEmail, postAccount } from '../controllers/accountController';
import { checkIfAdmin } from '../controllers/middelwares.ts/roles.middelwares';

export const accountRouter = express.Router();

accountRouter
.route('/')
.get(getAllAccounts)
.post(checkIfAdmin, checkBirthDateFormate, checkDuplicatedEmails, checkPostedAccountPayload, bcryptPassword, postAccount);

accountRouter
.route('/:email')
.get(getAccountByEmail)
.patch(checkIfAdmin, checkBirthDateFormate, checkDuplicatedEmails, patchAccountByEmail)
.delete(checkIfAdmin, deleteAccountByEmail);