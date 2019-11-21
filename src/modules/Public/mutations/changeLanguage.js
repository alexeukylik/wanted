import update from 'immutability-helper';
export default function (state, lang) {
    const change = update(state, {
        language: { $set: lang},
    });

    return change;
}