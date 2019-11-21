import { SHOW_POPUP } from "../../../actions/system";

export const togglePopup = (bool) => {
    return {
        type: SHOW_POPUP,
        payload: bool,
    };
};

export const togglePopupAuth = (flag) => {
    return {
        type: 'TOGGLE_POPUP_AUTH',
        payload: flag,
    };
};

export const togglePopupContact = (flag) => {
    return {
        type: 'TOGGLE_POPUP_CONTACT',
        payload: flag
    };
};

export  const togglePopupCmc = (flag) => {
    return {
        type: 'TOGGLE_POPUP',
        payload: flag,
    };
};

export  const togglePopupSuccess = (flag) => {
    return {
        type: 'TOGGLE_POP_SUCCESS',
        payload: flag,
    };
};

export const toggleModalError = (flag) => ({
    type: 'TOGGLE_MODAL',
    payload: flag,
});
