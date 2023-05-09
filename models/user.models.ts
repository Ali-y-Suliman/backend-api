import { objectify } from "../objectify";

export interface User {
	id?: string,
    email: string,
    password: string,
    isAdmin?: boolean,
}
const defaultUser: Required<User> = {
	id: '',
    email: '',
    password: '',
    isAdmin: false,
};
export const getDefaultUser = (): Required<User> => {
	return objectify( defaultUser );
};