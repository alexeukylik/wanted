import update from 'immutability-helper';
export default function (state, list) {

    const newLists = update(state, {
        lists: { $set: list },

    });

    return newLists;
}
