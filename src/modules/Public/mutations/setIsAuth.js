import update from 'immutability-helper';
export default function (state, flag) {

    const auth = update(state, {
        isAuth: { $set: flag},
    });

    return auth;
}
