import update from 'immutability-helper';
export default function (state, time) {

    const newTime = update(state, {
        timerCMC: { $set: time},
    });

    return newTime;
}
