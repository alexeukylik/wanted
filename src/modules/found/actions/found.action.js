
import service from './../api';
import { changeStatePreloader } from '../../Public/actions/public.action';
import { togglePopupSuccess, toggleModalError } from '../../modal/actions/modal.actions';
import { removeCurrentUser } from '../../auth/action/public.acton';

export const setListsFound = (list) => ({
    type: 'SET_LISTS_FOUND',
    payload: list,
});

export const editClear = () => ({
    type: 'CLEAR_EDIT_DATA'
});

export const setNumberOwnerDocument = (phone) => ({
    type: 'SET_PHONE_OWNER_DOCUMENT',
    payload: phone,
});

export const setFoundPage = (flag) => ({
    type: 'SET_STATE_FOUND_PAGE',
    payload: flag
});

export const getFound = (edit, dispatch) => {
    const document = {
        title: edit.title || '',
        category_id: edit.category_doc || '',
        description: edit.description || '',
        owner: edit.owner || edit.firstName_lastName || '',
        extra_number: edit.number_doc || '',
        extra_organization: edit.extra_organization || '',
        extra_data: edit.when_issued || '',
        extra_validity: edit.validity || ''
    };

    getLists();
    async function getLists() {
        try {
            dispatch(changeStatePreloader(true));
            const response = await service.getFoundListFromService(document);
            dispatch(setListsFound(response.data));
            dispatch(changeStatePreloader(false));
        }
        catch (error) {
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
            console.log('getFound error', error);
        }
    }
};

export const getFoundOwnerDocument = (id) => {
   
    return async (dispatch) => {
        try {
            dispatch(changeStatePreloader(true));
            const responsePhoneOwner = await service.findOwnerDocument(id);
            dispatch(togglePopupSuccess(true));
            dispatch(setNumberOwnerDocument(`+${responsePhoneOwner.data.message.phone}`));
            dispatch(changeStatePreloader(false));
        }
        catch (error) {
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
            dispatch(togglePopupSuccess(true));
            dispatch(setNumberOwnerDocument('Can`t find owner phone'));
            console.log('error FoundOwnerDocument', error);
        }
    };
};
