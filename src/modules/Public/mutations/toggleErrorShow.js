import update from 'immutability-helper';
export default function (state, flag) {

    const newData = update(state, {
        error: { $set: flag },
    });

    return newData;
}
