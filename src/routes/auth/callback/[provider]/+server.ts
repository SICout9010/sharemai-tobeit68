import { PUBLIC_REDIRECT_URL } from "$env/static/public";
import { redirect, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ locals, url, cookies }) => {
    const provider = JSON.parse(cookies.get('provider') ?? '{}');
    console.log(provider);

    if (provider.state !== url.searchParams.get('state')) {
        throw new Error('Invalid state');
    }

    try {
        const authData = await locals.pb.collection('users').authWithOAuth2Code(
            provider.name,
            url.searchParams.get('code') || '',
            provider.codeVerifier,
            PUBLIC_REDIRECT_URL + provider.name
        )

        // Create FormData to upload file into Pocketbase
        const formData = new FormData();
        formData.append('username', authData.meta?.name);
        formData.append('avatar', await fetch(authData.meta?.avatarUrl).then(res => res.blob()), `${locals.pb.authStore.model?.id}-avatar.jpg`);

        await locals.pb.collection('users').update(locals.pb.authStore.model?.id, formData)

        return redirect(303, '/main');
    } catch (e) {
        console.log(e);
        return redirect(303, '/auth?fail=true');
    }
}