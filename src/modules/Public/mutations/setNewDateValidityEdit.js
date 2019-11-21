import update from 'immutability-helper';
export default function (state, data) {
    const dataValidity = update(state, {
        edit: { extra: { validity: { $set: data ? data : '' } } },
    });

    return dataValidity;
}
