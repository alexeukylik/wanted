export function setCurrentUser(user) {
    return {
        type: 'SET_CURRENT_USER',
        payload: user,
    };
}

export function removeCurrentUser() {
    return {
        type: 'LOGOUT_CURRENT_USER',
    };
}