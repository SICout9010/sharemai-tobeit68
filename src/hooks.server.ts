import Pocketbase from 'pocketbase';
import { serializeNonPOJOs } from '$lib/utils';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

export const handle = async ({ event, resolve }) => {
    event.locals.pb = new Pocketbase(PUBLIC_POCKETBASE_URL);
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

    if (event.locals.pb.authStore.isValid) {
        event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model);
    } else {
        event.locals.user = undefined;
    }

    const response = await resolve(event);
    response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie({httpOnly: false, secure: false, sameSite: 'lax'}));

    return response;
}