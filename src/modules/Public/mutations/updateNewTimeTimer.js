import update from 'immutability-helper';
export default function (state, time) {

    const newTime = update(state, {
        runTimer: { $set: time},
    });

    return newTime;
}
