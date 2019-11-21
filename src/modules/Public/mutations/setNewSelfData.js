import update from 'immutability-helper';
export default function (state, data) {

    const newDataSelf = update(state, {
        firstName_lastName: { $set: data ? data : ''},
    });

    return newDataSelf;
}
