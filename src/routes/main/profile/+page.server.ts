export const actions = {
	update_info: async ({ locals, request }) => {
		const data = await request.formData();
        const { fullname, nickname, birthday, gender, info } = Object.fromEntries(data);

        // Create FormData for sending to Pocketbase
        const formData = new FormData();
        formData.append('fullname', fullname);
        formData.append('nickname', nickname);
        formData.append('birthday', birthday);
        formData.append('gender', gender);
        formData.append('info', info);

        // Update user info in Pocketbase
        try {
            await locals.pb.collection('users').update(locals.pb.authStore.model?.id, formData);
        } catch (error) {
            console.error(error);
            return { success: false };
        }

		return { success: true };
	},
}