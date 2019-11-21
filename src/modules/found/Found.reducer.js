import Found from './Found.defaultState';
import mapListsFound from './mutation/mapListsFound';
import setOwnerPhone from './mutation/setOwnerPhone';
import setNewStateFoundPage from './mutation/setNewStateFoundPage';

export default function (state = Found, { type, payload }) {
    switch (type) {
        case 'SET_LISTS_FOUND':
            return mapListsFound(state, payload);
        case 'SET_PHONE_OWNER_DOCUMENT':
            return setOwnerPhone(state, payload);
        case 'SET_STATE_FOUND_PAGE':
            return setNewStateFoundPage(state, payload);
        default:
            return state;
    }
}