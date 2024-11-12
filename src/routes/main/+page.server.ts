import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    // Check if the user is authenticated
    if (!locals.pb.authStore.isValid) {
        throw redirect(303, '/auth');
    }
}