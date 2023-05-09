import { objectify } from "../objectify";

export interface Account {
	id?: string,
	first_name: string,
    last_name: string,
    email: string,
    phone: string,
    password: string,
    birthday?: string,
    created_at?: string,
    last_modified?: string
}
const defaultAccount: Required<Account> = {
	id: '',
	first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    birthday: '',
    created_at: '',
    last_modified: ''
};
export const getDefaultAccount = (): Required<Account> => {
	return objectify( defaultAccount );
};