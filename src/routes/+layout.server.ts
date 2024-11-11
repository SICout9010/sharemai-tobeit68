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