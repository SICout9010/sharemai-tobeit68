import { redirect, error, json } from "@sveltejs/kit";

export async function POST({ locals, request }) {

    // Check if user is already logged in
    if (!locals.user || !locals.pb.authStore.isValid) {
        throw redirect(303, "/auth");
    }

    const { amountToPay, paymentMethod, cardNumber, expirationDate, cvv, cardholderName } = await request.json();

    // Bunchs of case guards being here.
    if (typeof amountToPay !== "number") {
        throw error(400, "Invalid amount");
    }

    if (amountToPay <= 0) {
        throw error(400, "Invalid amount");
    }

    if (typeof paymentMethod !== "string") {
        throw error(400, "Invalid payment method");
    }

    if (paymentMethod !== "credit-card") {
        throw error(400, "Invalid payment method");
    }

    if (typeof cardNumber !== "string") {
        throw error(400, "Invalid card number");
    }

    if (cardNumber.length !== 16) {
        throw error(400, "Invalid card number");
    }

    if (typeof expirationDate !== "string") {
        throw error(400, "Invalid expiration date");
    }

    if (expirationDate.length !== 5) {
        throw error(400, "Invalid expiration date");
    }

    if (typeof cvv !== "string") {
        throw error(400, "Invalid cvv");
    }

    if (cvv.length !== 3) {
        throw error(400, "Invalid cvv");
    }

    if (typeof cardholderName !== "string") {
        throw error(400, "Invalid cardholder name");
    }

    if (cardholderName.length < 3) {
        throw error(400, "Invalid cardholder name");
    }

    // Check if card number is test number (4242424242424242)
    if (cardNumber !== "4242424242424242") {
        throw error(400, "Invalid card number");
    }

    // Update user's balance
    try {
        await locals.pb.collection('users').update(locals.user.id, { credits: Number(locals.user.credits) + amountToPay });
    } catch (err) {
        console.log(err);
        throw error(500, "Failed to update balance");
    }

    return json({ credits: locals.user.credits });
}