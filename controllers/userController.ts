import express, { Application, NextFunction, Request, Response } from 'express';
import * as pg from '../lib.pool';
import { uuid } from '../uuid';
import { generateDeleteQuery, generateInsertQuery, generateUpdateQuery } from '../lib.sqlUtils';
import { User, getDefaultUser } from '../models/user.models';
import { checkBirthDate, formatDate } from '../dateFormate';
import * as bcrypt from 'bcrypt';
import { generateAuthToken } from '../lib.auth';
import { Jwt } from '../models/jwt.models';

export const checkPostedUserPayload = async (req: Request, res: Response, next: NextFunction,) => {
    const payload = req.body;

    if (!payload.email || !payload.password) {
        next(new Error('MissingData'));
    }
    next();
};

export const checkDuplicatedEmails = async (req: Request, res: Response, next: NextFunction,) => {
    const payload = req.body;
    const user: User = <User>((await pg.db.query(`select * from public."users" where email = $1 ;`, [payload.email])).rows[0]) || null;

    if (!payload.email) next();

    if (!!user?.email) {
        next(new Error('DuplicatedEmail'));
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

export const signInUser = async (req: Request, res: Response, next: NextFunction) => {
    try { 
        const payload = req.body;
        const user: User =
            <User>(
                (
                    await pg.db.query(
                        `select * from public."users" where email = $1 ;`, [payload?.email]
                    )
                ).rows[0]
            )
           console.log('user')             
           console.log(user)             
        if ( !user ) {
            throw new Error('user not found!');
        } else if (
            !user?.password ||
            (!!payload.password && !bcrypt.compareSync(payload.password, user.password))
        ) {
            throw new Error('user name/password error!');
        }

        const jwt: Jwt = {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin || false
        }
        const jwtToken = generateAuthToken(jwt);
        res.status(200)
            .json({
                code: 200,
                data: { token: jwtToken },
                message: 'success',
            });
    } catch (error) {
        next(new Error('SignInIssue'));
    }

}

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users: User[] =
            <User[]>(
                (
                    await pg.db.query(
                        `select * from public."users" ;`,
                    )
                ).rows
            ) || null;
        res.send(users);
    } catch (error) {
        next(new Error('GettingDataIssue'));
    }

}

export const postUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload: User = req.body;
        payload.id = uuid();
        const query = generateInsertQuery<User>(
            `public."users"`,
            getDefaultUser(),
            payload,
            true,
            !payload.id,
        );
        const result = await pg.db.query<User>(query.text, query.values);
        res.send(result);
        return;
    } catch (error) {
        next(new Error('postingIssue'));
    }

}

export const getUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.params.email;
        const user: User =
            <User>(
                (
                    await pg.db.query(
                        `select * from public."users" where email = $1 ;`, [email],
                    )
                ).rows[0]
            ) || null;
        res.send(user);
    } catch (error) {
        next(new Error('GettingByIdIssue'));
    }

}

export const patchUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload: Partial<User> = req.body;
        const email = req.params.email;
        const userId = (
            await pg.db.query<User>(
                `select * from public."users" where "email" = $1;`,
                [email],
            )
        ).rows[0]?.id;

        const userPatchQuery = generateUpdateQuery(
            'public."users"',
            getDefaultUser(),
            payload,
        );
        userPatchQuery.text += `where "id" = $${++userPatchQuery.paramCounter}`;
        userPatchQuery.values.push(userId);
        const result = await pg.db.query<User>(userPatchQuery.text, userPatchQuery.values);
        res.send(result);
        return;
    } catch (error) {
        next(new Error('PatchingIssue'));
    }

}

export const deleteUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.params.email;
        const userId = (
            await pg.db.query<User>(
                `select * from public."users" where "email" = $1;`,
                [email],
            )
        ).rows[0]?.id;

        const deleteQuery = generateDeleteQuery('public."users"', {
            id: userId,
        });
        const result = await pg.db.query<User>(deleteQuery.text, deleteQuery.values);
        res.send(result);
    } catch (error) {
        next(new Error('DeletingIssue'));
    }

}
