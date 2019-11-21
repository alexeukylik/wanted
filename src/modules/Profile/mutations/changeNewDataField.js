import update from 'immutability-helper';
export default function (state, data) {
    if(data.extra) {
        const newCurrentFieldTables = {...state.edit, [data.nameField]: {...state.edit[data.nameField], [data.extra]:data.text} };
        const change = update(state, {
            edit: { $set: newCurrentFieldTables},
        });
        return change;
    } else {
        const newCurrentFieldTables = {...state.edit, [data.nameField]: data.text};
        const change = update(state, {
            edit: { $set: newCurrentFieldTables},
        });
        return change;
    }
   
}