import update from 'immutability-helper';
export default function (state, newNumberDoc) {

    const newNDoc = update(state, {
        number_doc: { $set: newNumberDoc ? newNumberDoc : ''},
    });

    return newNDoc;
}
