import update from 'immutability-helper';
export default function (state, auth) {
    const authorization = update(state, {
        user: { $set: auth.user },
        token: { $set: auth.token },
        isAuthenticated: { $set: true},
    });
    return authorization;
}