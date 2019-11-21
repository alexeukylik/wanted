import update from 'immutability-helper';
export default function (state, flag) {

    const confirmed = update(state, {
        phone_sended: { $set: flag},
    });

    return confirmed ;
}
