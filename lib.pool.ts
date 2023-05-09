import { Pool } from 'pg';
import { dbSettings } from './settings/settings';

export const db = new Pool( {
	...dbSettings,
	application_name: 'account',
} );