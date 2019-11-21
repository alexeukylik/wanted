import defaultState from './modal.defaultState';
import { SHOW_POPUP } from '../../actions/system';
import showPopupActivity from './mutations/showPopupActivity';
import togglePopupCmc from './mutations/togglePopupCmc';
import togglePopupAuth from './mutations/togglePopupAuth';
import togglePopupContact from './mutations/togglePopupContact';
import togglePopupSuccess from './mutations/togglePopupSuccess';
import setToggleModalError from './mutations/setToggleModalError';


export default function(state=defaultState, { type, payload }) {
    switch(type) {
        case SHOW_POPUP:
            return showPopupActivity(state, payload);
        case 'TOGGLE_POPUP': 
            return togglePopupCmc(state, payload);
        case 'TOGGLE_POPUP_AUTH':
            return togglePopupAuth(state, payload);
        case 'TOGGLE_POPUP_CONTACT':
            return togglePopupContact(state, payload);
        case 'TOGGLE_POP_SUCCESS':
            return togglePopupSuccess(state, payload);
        case 'TOGGLE_MODAL':
            return setToggleModalError(state, payload);
        default:
            return state;
    }
}