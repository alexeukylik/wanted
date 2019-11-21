import update from 'immutability-helper';
export default function (state, phone) {

    const newPhone = update(state, {
        phone_owner: { $set: phone },
    });

    return newPhone;
}
