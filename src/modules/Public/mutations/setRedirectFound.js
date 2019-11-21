import update from 'immutability-helper';
export default function (state, flag) {

    const redirect = update(state, {
        redirect_found: { $set: flag},
    });

    return redirect;
}
