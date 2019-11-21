import update from 'immutability-helper';
export default function (state, flag) {

    const newData = update(state, {
        preloader: { $set: flag},
    });

    return newData;
}
