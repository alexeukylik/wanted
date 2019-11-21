import update from 'immutability-helper';
export default function (state, doc) {

    const category = update(state, {
        category_doc: { $set: doc ? doc : ''},
    });
    return category;
}
