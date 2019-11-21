import update from 'immutability-helper';
// import formatDate from './../../../helpers/formatDate';
export default function (state, date) {
  
    const issued = update(state, {
        when_issued: { $set: date ? date : ''},
        // when_issued_format: {$set: formatDate(date)}
    });
    return issued;
}
