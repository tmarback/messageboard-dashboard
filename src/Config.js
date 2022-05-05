const version = 'v1';
const server = `https://api.miosha.moe/million/${version}`;

export function makeEndpoint( endpoint ) {

    return `${server}/${endpoint}`;

}

export const endpoint = makeEndpoint( 'messages/admin' );