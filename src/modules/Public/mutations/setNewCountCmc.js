import update from 'immutability-helper';
export default function (state, count) {

    const counterCMC = update(state, {
        counter_cmc: { $set: count},
    });

    return counterCMC;
}
