export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";

export async function loginUser(userId){
    return { type: USER_LOGIN, payload: userId }
}

export function logoutUser() {
    return { type: USER_LOGOUT }
}