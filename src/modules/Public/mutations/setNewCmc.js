import update from 'immutability-helper';
export default function (state, cmc) {

    const setCmc = update(state, {
        cmc: { $set: cmc},
    });

    return setCmc;
}
