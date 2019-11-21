import update from 'immutability-helper';
export default function (state, flag) {

    const call = update(state, {
        call_me: { $set: flag},
    });

    return call;
}
