import update from 'immutability-helper';
export default function (state, date) {
    const dataIssued = update(state, {
        edit: { extra: { data: { $set: date ? date : '' }}},
    });
    return dataIssued;
}
