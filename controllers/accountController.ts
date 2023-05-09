import express, { Application, NextFunction, Request, Response } from 'express';
import * as pg from '../lib.pool';
import { uuid } from '../uuid';
import { generateDeleteQuery, generateInsertQuery, generateUpdateQuery } from '../lib.sqlUtils';
import { Account, getDefaultAccount } from '../models/account.models';
import { checkBirthDate, formatDate } from '../dateFormate';
import * as bcrypt from 'bcrypt';
import { sendEmail } from '../emailsender';

export const checkPostedAccountPayload = async (req: Request, res: Response, next: NextFunction,) => {
    const payload = req.body;

    if (!payload.email || !payload.first_name || !payload.last_name || !payload.password || !payload.phone) {
        next(new Error('MissingData'));
    }
    next();
};

export const checkDuplicatedEmails = async (req: Request, res: Response, next: NextFunction,) => {
    const payload = req.body;
    const account: Account = <Account>((await pg.db.query(`select * from public."accounts" where email = $1 ;`, [payload.email])).rows[0]) || null;

    if (!payload.email) next();

    if (!!account?.email) {
        next(new Error('DuplicatedEmail'));
    }

    next();
};

export const checkBirthDateFormate = async (req: Request, res: Response, next: NextFunction,) => {
    const payload = req.body;
    if (!!payload.birthday) {
        const isValidFormate: boolean = checkBirthDate(payload.birthday);
        if (!isValidFormate) {
            next(new Error('BirthdayWrong'));
        }
    }

    next();
};

export const bcryptPassword = async (req: Request, res: Response, next: NextFunction,) => {
    const payload = req.body;
    payload.password = await bcrypt.hash(
        payload.password,
        10,
    );
    next();
};

export const getAllAccounts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accounts: Account[] =
            <Account[]>(
                (
                    await pg.db.query(
                        `select * from public."accounts" ;`,
                    )
                ).rows
            ) || null;
        res.send(accounts);
    } catch (error) {
        next(new Error('GettingDataIssue'));
    }

}

export const postAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body;
        payload.id = uuid();
        const newDate = new Date();
        payload.created_at = formatDate(newDate);
        payload.last_modified = payload.created_at;
        const query = generateInsertQuery<Account>(
            `public."accounts"`,
            getDefaultAccount(),
            payload,
            true,
            !payload.id,
        );
        const result = await pg.db.query<Account>(query.text, query.values);

        sendEmail(payload);

        res.send(result);
        return;
    } catch (error) {
        next(new Error('postingAccountsIssue'));
    }

}

export const getAccountByEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.params.email;
        const account: Account =
            <Account>(
                (
                    await pg.db.query(
                        `select * from public."accounts" where email = $1 ;`, [email],
                    )
                ).rows[0]
            ) || null;
        res.send(account);
    } catch (error) {
        next(new Error('GettingAccountByIdIssue'));
    }

}

export const patchAccountByEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload: Partial<Account> = req.body;
        const newDate = new Date();
        payload.last_modified = formatDate(newDate);
        const email = req.params.email;
        const accountId = (
            await pg.db.query<Account>(
                `select * from public."accounts" where "email" = $1;`,
                [email],
            )
        ).rows[0]?.id;

        const accountPatchQuery = generateUpdateQuery(
            'public."accounts"',
            getDefaultAccount(),
            payload,
        );
        accountPatchQuery.text += `where "id" = $${++accountPatchQuery.paramCounter}`;
        accountPatchQuery.values.push(accountId);
        const result = await pg.db.query<Account>(accountPatchQuery.text, accountPatchQuery.values);
        res.send(result);
        return;
    } catch (error) {
        next(new Error('PatchingAccountIssue'));
    }

}

export const deleteAccountByEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.params.email;
        const accountId = (
            await pg.db.query<Account>(
                `select * from public."accounts" where "email" = $1;`,
                [email],
            )
        ).rows[0]?.id;

        const deleteQuery = generateDeleteQuery('public."accounts"', {
            id: accountId,
        });
        const result = await pg.db.query<Account>(deleteQuery.text, deleteQuery.values);
        res.send(result);
    } catch (error) {
        next(new Error('DeletingAccountIssue'));
    }

}
