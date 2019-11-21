import update from 'immutability-helper';
export default function (state, name) {

    const issued = update(state, {
        why_issued: { $set: name ? name : ''},
    });

    return issued;
}
