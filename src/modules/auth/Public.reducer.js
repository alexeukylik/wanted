import Public from './Public.defaultState';
import setAuthUser from './mutation/setAuthUser';
import removeAuthUser from './mutation/removeAuthUser';


export default function (state = Public, { type, payload }) {
    switch (type) {
        case 'SET_CURRENT_USER':
            return setAuthUser(state, payload);
        case 'LOGOUT_CURRENT_USER': 
            return removeAuthUser(state);
        default:
            return state;
    }
}
