import update from 'immutability-helper';
export default function (state, obj) {

    const newId = update(state, {
        table_row_id: { $set: obj.remove ? [...state.table_row_id, obj.id] : state.table_row_id.filter(id => id !== obj.id)},
    });
    return newId;
}
