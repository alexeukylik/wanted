import update from 'immutability-helper';
export default function (state, flag) {

    const newState = update(state, {
        authorization_through_logbook: { $set: flag},
    });
    return newState;
}
