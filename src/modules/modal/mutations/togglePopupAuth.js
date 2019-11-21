import update from 'immutability-helper';

export default function(state, show) {
    return update(state, {
        showPopup_auth: { $set: show}
    });
}