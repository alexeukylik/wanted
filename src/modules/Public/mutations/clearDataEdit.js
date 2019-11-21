import update from 'immutability-helper';
export default function (state) {

    const confirmed = update(state, {
        edit: { $set: [] },
    });

    return confirmed;
}
