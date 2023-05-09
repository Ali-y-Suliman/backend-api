import * as jwt from 'jsonwebtoken';
import { botJwtSecret, jwtTokenLifeTime } from './settings/settings';
import { Jwt } from './models/jwt.models';

const secret = botJwtSecret;
const tokenLifeSapn = jwtTokenLifeTime;

export const generateAuthToken = ( payload: any ) =>
	jwt.sign( payload, secret, {
		expiresIn: `${tokenLifeSapn}d`,
		algorithm: 'HS256',
	} );

export const verifyAuthToken = ( idToken: string ) => {
	try {
		return <Jwt>jwt.verify( idToken, secret );
	} catch ( err ) {
		console.error( err );
		return null;
	}
};

