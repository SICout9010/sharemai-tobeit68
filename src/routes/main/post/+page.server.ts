export const load = ({ locals }) => {
    if (locals.user) {
        console.log("User exists")
        return {
            user: locals.user
        }
    }
    
    console.log("User does not exist")
    return {
        user: undefined
    }
}

export const actions = {
	create_post: async ({ locals, request }) => {
		const data = await request.formData();
        const { user_id, departure_location, destination, seats, prefer_sex, additional_notes, distance_km } = Object.fromEntries(data);

        // Calculate cost per person using distance_km, 10THB per km
        let costs = Number(distance_km) * 10;
        costs /= Number(seats);
        costs.toFixed(2);

        // Create JSON Data for sending to Pocketbase
        const send_data = {
            user_id: user_id,
            trip_type: "driver",
            departure_location: departure_location,
            destination: destination,
            departure_time: new Date().toISOString(),
            available_seats: seats,
            cost_per_person: costs,
            preferences: {
                sex: prefer_sex,
            },
            additional_notes: additional_notes,
            status: "open",
        }

        // create post in Pocketbase
        try {
            await locals.pb.collection('posts').create(send_data);
        } catch (error) {
            console.error(error);
            return { success: false };
        }

		return { success: true };
	},
}