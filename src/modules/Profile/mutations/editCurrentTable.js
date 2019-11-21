import update from 'immutability-helper';
export default function (state, id) {
    const newArrTables = state.lists.filter(el=> el.id === id);
    const newOb = Object.assign({}, ...newArrTables);
    const change = update(state, {
        edit: { $set: newOb},
    });
    return change;
}