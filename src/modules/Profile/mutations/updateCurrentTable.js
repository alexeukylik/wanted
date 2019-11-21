import update from 'immutability-helper';
export default function (state, table) {
    const newArrTables = state.lists.map(el=> {
        if(el.category_id === table.category_id) {
            el = table;
            return el;
        }
        return el;
    });
    const change = update(state, {
        lists: { $set: newArrTables},
    });

    return change;
}