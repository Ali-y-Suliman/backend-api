import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    let message = ''
    switch (err.message) {
        case 'WrongUrl':
            message = `Can't find ${req.originalUrl} on this server`
            break;

        case 'GettingDataIssue':
            message = `Issue occured while fetching the Accounts`
            break;

        case 'postingIssue':
            message = `Issue occured while posting an Account`
            break;

        case 'GettingByIdIssue':
            message = `Issue occured while getting an account by id`
            break;

        case 'PatchingIssue':
            message = `Issue occured while updating an Account`
            break;

        case 'DeletingIssue':
            message = `Issue occured while deleting an Account`
            break;

        case 'MissingData':
            message = `Missing Data Issue`
            break;

        case 'DuplicatedEmail':
            message = `Email is alredy exist`
            break;

        case 'BirthdayWrong':
            message = `Wrong Birthday Format, the correct formate is: 'yyyy-mm-dd'`
            break;

        case 'SignInIssue':
            message = `Sign in didn't success`
            break;

        case 'UnauthorizedAccess':
            message = `Unauthorized access`
            break;

        case 'IsNotAdmin':
            message = `Your not able to complete this process, it's available for Admins only`
            break;
    }
    res.status(500)
        .json({
            code: 500,
            data: {},
            message: message,
            error: message,
        });
};
