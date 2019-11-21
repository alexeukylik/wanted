export const removeTable =  (id) => {
    return {
        type: 'DELETED_CURRENT_TABLE',
        payload: id,
    };
};

export const currentEditTable = (id) => {
    return {
        type: 'EDIT_CURRENT_TABLE',
        payload: id
    };
};

export const setNewDataField = (text, nameField, extra) => {
    return {
        type: 'CHANGE_NEW_DATA_FIELD',
        payload: {
            text: text,
            nameField: nameField,
            extra: extra
        }
    };
};

export const renderList = (list) => {
    return {
        type: 'RENDER_LIST',
        payload: list,
    };
};

export const updateTable = (table) => {
    return {
        type: 'UPDATE_CHANGED_TABLE',
        payload: table
    };
};

export const setNewChangeRadio = (checked) => {
    return {
        type: 'SET_OTHER_CHECKED_RADIO',
        payload: checked,
    };
};

export const saveTableRowId = (id) => {
    return {
        type: 'SAVE_TABLE_ROW_ID',
        payload: id,
    };
};
