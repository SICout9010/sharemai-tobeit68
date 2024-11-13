import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    // Check if the user is authenticated
    if (!locals.pb.authStore.isValid) {
        throw redirect(303, '/auth');
    }

    const post_records = await locals.pb.collection('posts').getFullList({
        expand: "user_id",
        sort: '-created'
    });
    console.log(post_records);

    return {
        posts: post_records,
    }
}