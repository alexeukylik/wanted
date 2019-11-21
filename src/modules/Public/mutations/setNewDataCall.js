import update from 'immutability-helper';
export default function (state, data) {

    const ruleCall = update(state, {
        send_rule_phone: { $set: data},
    });

    return ruleCall;
}
