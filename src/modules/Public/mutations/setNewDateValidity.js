import update from 'immutability-helper';
export default function (state, date) {
    const change = update(state, {
        validity: { $set: date ? date : '' },
    });

    return change;
}