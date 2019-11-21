import update from 'immutability-helper';
export default function (state, listsArr) {
    const change = update(state, {
        lists: { $set: listsArr},
    });

    return change;
}