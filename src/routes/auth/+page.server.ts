import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { PUBLIC_REDIRECT_URL } from '$env/static/public';

export const load: PageServerLoad = async ({ locals, url }) => {

    // Check if user is already logged in
    if (locals.pb.authStore.isValid) {
        throw redirect(303, '/main');
    }

    const authMethods = await locals.pb.collection('users').listAuthMethods();
    const fail = url.searchParams.get('fail') === 'true';

    return {
        providers: authMethods.authProviders, 
        fail
    }
}

export const actions = {
    google: async ({ locals, cookies }) => {
        console.log("logging with Google...");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const provider = (await locals.pb.collection('users').listAuthMethods()).authProviders.find((p: any) => p.name === 'google');
        cookies.set('provider', JSON.stringify(provider), { path: '/auth/callback/google', httpOnly: false, secure: false, sameSite: 'lax' });

        throw redirect(303, provider?.authUrl + PUBLIC_REDIRECT_URL + provider?.name);
    },
    logout: async ({ locals }) => {
        await locals.pb.authStore.clear();
        throw redirect(303, '/auth');
    }
}