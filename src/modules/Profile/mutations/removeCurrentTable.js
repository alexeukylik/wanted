import update from 'immutability-helper';
export default function (state, id) {
    const newArrTables = state.lists.filter(el=> el.id !== id);
    const change = update(state, {
        lists: { $set: newArrTables},
    });

    return change;
}