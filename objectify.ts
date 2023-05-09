export const objectify = <T> ( payload: T ): T => {
	return JSON.parse( JSON.stringify( payload ) );
};