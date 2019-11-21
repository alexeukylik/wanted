import update from 'immutability-helper';
export default function (state) {
    const logout = update(state, {
        user: { $set: '' },
        token: { $set: '' },
        isAuthenticated: { $set: false },
    });
    return logout;
}