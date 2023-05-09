import express, { NextFunction, Request, Response } from 'express';

export const checkIfAdmin = async (req: Request, res: Response, next: NextFunction,) => {
    const payload = req.body;

    console.log('req.body')
    console.log(req.body)
    if ( !payload.currentUser.isAdmin ) {
        next(new Error('IsNotAdmin'));
    }
    next();
};