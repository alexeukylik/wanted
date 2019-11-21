import service from './../api';
import serviceProfile from './../../Profile/api';
import {CHANGE_CATEGORY} from '../../../actions/system';
import {togglePopup, togglePopupCmc, toggleModalError} from './../../modal/actions/modal.actions';
import { removeTable, renderList } from './../../Profile/actions/profile.actions';
import setAuthorizationToken from '../../../utils/setAuthhorizationToken';
import {setCurrentUser, removeCurrentUser} from '../../auth/action/public.acton';
import generateId from '../../../helpers/generateId';

export const redirectFound = (flag) => ({
    type: 'REDIRECT_FOUND',
    payload: flag
});

export const myBookAuthorization = (flag) => ({
    type: 'SET_AUTHORIZATION_THROUGH_MY_BOOK',
    payload: flag,
});

export const attachId = (flag) => ({
    type: 'SUBMIT_BUTTON_ATTACH',
    payload: flag
});

export const setChangeTitle = (value) => ({
    type: 'SET_CHANGE_TITLE',
    payload: value,
});

export const changeStatePreloader = (flag) => ({
    type: 'CHANGE_PRELOADER',
    payload: flag,
});

export const changeDateIssued = (date) => ({
    type: 'CHANGE_DATE_ISSUED',
    payload: date,
});

export const changeDateValidity = (date) => ({
    type: 'CHANGE_DATE_VALIDITY',
    payload: date,
});

export const tickTimer = (second) => {
    return {
        type: 'SET_NEW_TIME_INTERVAL',
        payload: second,
    };
};

export const tickTimerCmc = (second) => {
    return {
        type: 'SET_NEW_TIME_INTERVAL_CMC',
        payload: second,
    };
};

export const setNewCategory = (doc) => {
    return {
        type: CHANGE_CATEGORY,
        payload: doc,
    };
};

export const setLanguage = (lang) => ({
    type: 'SET_LANGUAGE',
    payload: lang,
});

export const setNumberDoc = (number) => {
    return {
        type: 'SET_NEW_NUMBER_DOCUMENT',
        payload: number,
    };
};

export const setNewNameAndFamily = (data) => {
    return {
        type: 'SET_NEW_FIRST_NAME_AND_LAST_NAME',
        payload: data,
    };
};

export const setWhyIssued = (name) => {
    return {
        type: 'WHY_ISSUED_BY',
        payload: name,
    };
};

export const setChangeDateIssue = (date) => {
    return {
        type: 'SET_NEW_DATE',
        payload: date,
    };
};

export const setChangeDateValidity = (data) => {
    return {
        type: 'SET_NEW_DATE_VALIDITY',
        payload: data
    };
};

export const setAgreeCall = (data) => {
    return {
        type: 'SET_RULE_CALL',
        payload: data,
    };
};

export const toggleAgreeCall = (flag) => {
    return {
        type: 'TOGGLE_AGREE_CALL',
        payload: flag,
    };
};

export const setPhone = (phone) => {
    return {
        type: 'SET_PHONE',
        payload: phone,
    };
};

export const setCmc = (cmc) => {
    return {
        type: 'SET_CMC',
        payload: cmc,
    };
};

export const counterCmc = (count) => {
    return {
        type: 'CHANGE_COUNT_CMC',
        payload: count,
    };
};

export const setAuth = (flag) => {
    return {
        type: 'SET_AUTH',
        payload: flag,
    };
};

export const phoneConfirmed = (flag) => {
    return {
        type: 'CONFIRMED_PHONE',
        payload: flag,
    };
};

export const setError = (flag) => ({
    type: 'SET_ERROR',
    payload: flag,
});

// preparation   send phone service
export const preparationPhone = (phone, counter, close) => {
    let initialCounter = counter;
    return async (dispatch) => {
        try {
            dispatch(changeStatePreloader(true));
            let successPhone = await service.getPhoneFromService(phone);
            initialCounter++;
            dispatch(counterCmc(initialCounter));
            dispatch(phoneConfirmed(successPhone.data.message));
            close();
            dispatch(togglePopupCmc(true));
            dispatch(changeStatePreloader(false));
        } catch (error) {
            dispatch(changeStatePreloader(false));
            console.log('preparation', error);
            if(error.response){
                dispatch(toggleModalError(error.response.status + ' - ' + error.response.statusText));
            } else {
                dispatch(toggleModalError('Something wrong try again later'));
            }
        }
    };
};

// login (Auth)
export const login = (data, store) => {
    let initialCounter = data.counter;
    return async (dispatch) => {
        try {
            localStorage.removeItem('imToken');
            dispatch(changeStatePreloader(true));
            dispatch(counterCmc(initialCounter));
            const responseRule = await service.setAuth(data);
            localStorage.setItem('imToken', JSON.stringify({
                token: responseRule.data.token,
                user: responseRule.data.user
            }));
            setAuthorizationToken(responseRule.data.token);
            dispatch(setCurrentUser({user: responseRule.data.user, token: responseRule.data.token}));
            dispatch(togglePopupCmc(false));
            initialCounter++;
            dispatch(counterCmc(initialCounter));
            setTimeout(() => getList(dispatch), 200);
            if(!store.authorization_through_logbook) {
                setTimeout(() => createDocument(store, dispatch), 1000);
            }
            dispatch(changeStatePreloader(false));
        } catch (error) {
            dispatch(changeStatePreloader(false));
            console.log('error login', error);
            dispatch(setError(true));
            if(error.response){
                dispatch(toggleModalError(error.response.status + ' - ' + error.response.statusText));
            } else {
                dispatch(toggleModalError('Something wrong try again later'));
            }
        }
    };
};

// logout
export const logout = () => {
    return async (dispatch) => {
        try {
            dispatch(changeStatePreloader(true));
            await service.logoutProfile();
            localStorage.removeItem('imToken');
            dispatch(removeCurrentUser());
            dispatch(setAuth(false));
            dispatch(setCmc(''));
            dispatch(setPhone(''));
            dispatch(phoneConfirmed(''));
            dispatch(changeStatePreloader(false));
        } catch (error) {
            dispatch(changeStatePreloader(false));
            dispatch(myBookAuthorization(false));
            console.log('error logout', error);
            if(error.response){
                dispatch(toggleModalError(error.response.status + ' - ' + error.response.statusText));
            } else {
                dispatch(toggleModalError('Something wrong try again later'));
            }
        }
    };
};

// getList
export const getList = (dispatch) => {
    list();
    async function list() {
        try {
            dispatch(changeStatePreloader(true));
            const response = await serviceProfile.getListDocument();
            dispatch(renderList(response.data));
            dispatch(togglePopupCmc(false));
            dispatch(changeStatePreloader(false));
        } catch (error) {
            if(error.response === undefined) {
                localStorage.removeItem('imToken');
                dispatch(removeCurrentUser());
                window.location.reload();
            }
            if(error.response){
                if(error.response.status === 401) {
                    localStorage.removeItem('imToken');
                    dispatch(removeCurrentUser());
                }
                dispatch(toggleModalError(error.response.status + ' - ' + error.response.statusText));
            } else {
                dispatch(toggleModalError('Something wrong try again later'));
            }
            dispatch(changeStatePreloader(false));
            console.log('getlist error', error);
        }
    }
};


// create document !!!
export const createDocument = (store, dispatch) => {
    const document = {
        title: store.title,
        category_id: store.category_doc,
        description: store.number_doc,
        owner: store.firstName_lastName,
        extra_number: store.number_doc,
        extra_organization: store.why_issued,
        extra_data: store.when_issued,
        extra_validity: store.validity,
        id: generateId(store.lists)
    };
    create();
    async function create() {
        try {
            dispatch(changeStatePreloader(true));
            await serviceProfile.createDocumentService(document);
            getList(dispatch);
            dispatch(togglePopupCmc(false));
            dispatch(changeStatePreloader(false));
        } catch (error) {
            if(error.response){
                if(error.response.status === 401) {
                    localStorage.removeItem('imToken');
                    dispatch(removeCurrentUser());
                }
                dispatch(toggleModalError(error.response.status + ' - ' + error.response.statusText));
            } else {
                dispatch(toggleModalError('Something wrong try again later'));
            }
            dispatch(changeStatePreloader(false));
            console.log(error, 'error create');
        }
    }
};

// update document
export const updateDoc = (edit, store) => {
    const document = {
        title: edit.title,
        category_id: edit.category_id,
        description: edit.description,
        owner: edit.owner,
        extra_number: edit.extra.number,
        extra_organization: edit.extra.organization,
        extra_data: edit.extra.data,
        extra_validity: edit.extra.validity,
        id: edit.id,
    };
    return async (dispatch) => {
        try {
            dispatch(changeStatePreloader(true));
            await serviceProfile.updateDocumentService(document);
            getList(dispatch);
            dispatch(togglePopup(false));
            dispatch(changeStatePreloader(false));
        } catch (error) {
            if(error.response){
                if(error.response.status === 401) {
                    localStorage.removeItem('imToken');
                    dispatch(removeCurrentUser());
                }
                dispatch(toggleModalError(error.response.status + ' - ' + error.response.statusText));
            } else {
                dispatch(toggleModalError('Something wrong try again later'));
            }
            dispatch(changeStatePreloader(false));
            console.log('error update', error);
        }
    };
};

// delete document
export const deleteDocument = (id) => {
    return async (dispatch) => {
        try {
            dispatch(changeStatePreloader(true));
            const response = await serviceProfile.deleteDocumentService(id);
            getList(dispatch);
            dispatch(removeTable(response.data.id));
            dispatch(togglePopup(false));
            dispatch(changeStatePreloader(false));
        } catch (error) {
            if(error.response){
                if(error.response.status === 401) {
                    localStorage.removeItem('imToken');
                    dispatch(removeCurrentUser());
                }
                dispatch(toggleModalError(error.response.status + ' - ' + error.response.statusText));
            } else {
                dispatch(toggleModalError('Something wrong try again later'));
            }
            dispatch(changeStatePreloader(false));
            console.log('error delete', error);
        }
    };
};

// restore document
export const restoreDocument = (id) => {
    return async (dispatch) => {
        dispatch(changeStatePreloader(true));
        try {
            await serviceProfile.restoreDocumentService(id);
            getList(dispatch);
            dispatch(changeStatePreloader(false));
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    localStorage.removeItem('imToken');
                    dispatch(removeCurrentUser());
                }
                dispatch(toggleModalError(error.response.status + ' - ' + error.response.statusText));
            } else {
                dispatch(toggleModalError('Something wrong try again later'));
            }
            dispatch(changeStatePreloader(false));
            console.log('error restore', error);
        }
    };
};


// get document id
export const getDocument = (id) => {
    return async (dispatch) => {
        try {
            dispatch(changeStatePreloader(true));
            await serviceProfile.getCurrentDocument(id);
            getList(dispatch);
            dispatch(togglePopup(false));
            dispatch(changeStatePreloader(false));
        } catch (error) {
            if(error.response){
                if(error.response.status === 401) {
                    localStorage.removeItem('imToken');
                    dispatch(removeCurrentUser());
                }
                dispatch(toggleModalError(error.response.status + ' - ' + error.response.statusText));
            } else {
                dispatch(toggleModalError('Something wrong try again later'));
            }
            dispatch(changeStatePreloader(false));
            console.log('error table id', error);
        }
    };
};