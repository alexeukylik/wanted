import update from 'immutability-helper';
export default function (state, id) {

    const confirmed = update(state, {
        document_found_id: { $set: id },
    });

    return confirmed;
}
