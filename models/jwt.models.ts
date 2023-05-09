import { objectify } from "../objectify";

export interface Jwt {
	id?: string,
	email?: string,
    isAdmin?: boolean,
}
const defaultJwt: Required<Jwt> = {
	id: '',
	email: '',
    isAdmin: false,
};
export const getDefaultJwt = (): Required<Jwt> => {
	return objectify( defaultJwt );
};