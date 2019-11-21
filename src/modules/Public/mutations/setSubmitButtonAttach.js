import update from 'immutability-helper';
export default function (state, flag) {

    const redirect = update(state, {
        attach_button: { $set: flag },
    });

    return redirect;
}
