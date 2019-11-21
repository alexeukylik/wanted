import update from 'immutability-helper';
export default function (state, phone) {

    const setPhone = update(state, {
        phone: { $set: phone},
    });

    return setPhone;
}
