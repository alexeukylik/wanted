import update from 'immutability-helper';
export default function (state, flag) {

    const newState = update(state, {
        found_page: { $set: flag },
    });

    return newState;
}
