export { v1 as uuid } from 'uuid';

export const isUUID = ( uuid: any ) => {
	if ( uuid.match( '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$' ) === null ) {
		return false;
	}
	return true;
}
