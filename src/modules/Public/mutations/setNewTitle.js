import update from 'immutability-helper';
export default function (state, value) {

    const newTitle = update(state, {
        title: { $set: value},
    });

    return newTitle;
}
