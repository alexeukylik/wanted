import update from 'immutability-helper';

export default function(state, flag) {
    return update(state, {
        contact: { $set: flag}
    });
}