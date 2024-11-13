import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "../$types";

export const load: LayoutServerLoad = async ({ locals }) => {
    // Check if the user is authenticated
    if (!locals.pb.authStore.isValid) {
        throw redirect(303, '/auth');
    }

    const post_records = await locals.pb.collection('posts').getFullList({
        expand: "user_id",
        sort: '-created'
    });

    return {
        posts: post_records,
    }
}