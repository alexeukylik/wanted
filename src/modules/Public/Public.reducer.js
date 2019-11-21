import Public from './Public.defaultState';
import { CHANGE_CATEGORY} from '../../actions/system';
import changeLanguage from './mutations/changeLanguage';
import setCategory from './mutations/setCategory';
import setNewNumberDoc from './mutations/setNewNumberDoc';
import setNewSelfData from './mutations/setNewSelfData';
import setNamingWhyIssued from './mutations/setNamingWhyIssued';
import setNewDateIssued from './mutations/setNewDateIssued';
import setNewDateValidity from './mutations/setNewDateValidity';
import setNewDataPhone from './mutations/setNewDataPhone';
import setNewCmc from './mutations/setNewCmc';
import toggleDateAgreeCall from './mutations/toggleDateAgreeCall';
import setNewDataCall from './mutations/setNewDataCall';
import setNewCountCmc from './mutations/setNewCountCmc';
import setIsAuth from './mutations/setIsAuth';
import removeCurrentTable from './../Profile/mutations/removeCurrentTable';
import editCurrentTable from './../Profile/mutations/editCurrentTable';
import changeNewDataField from './../Profile/mutations/changeNewDataField';
import updateCurrentTable from './../Profile/mutations/updateCurrentTable';
import updateNewTimeTimer from './mutations/updateNewTimeTimer';
import confirmedPhone from './mutations/confirmedPhone';
import renderCurrentTable from './../Profile/mutations/renderCurrentTable';
import checkedOtherRadio from './/mutations/checkedOtherRadio';
import updateNewTimeTimerCmc from './/mutations/updateNewTimeTimerCmc';
import clearDataEdit from './mutations/clearDataEdit';
import togglePreloader from './mutations/togglePreloader';
import toggleErrorShow from './mutations/toggleErrorShow';
import setDateIssuedEdit from './mutations/setDateIssuedEdit';
import setNewDateValidityEdit from './mutations/setNewDateValidityEdit';
import setTableRowId from './mutations/setTableRowId';
import setRedirectFound from './mutations/setRedirectFound';
import setSubmitButtonAttach from './mutations/setSubmitButtonAttach';
import setNewTitle from './mutations/setNewTitle';
import setMybookAuthorization from './mutations/setMybookAuthorization';

export default function(state = Public, {type, payload}) {
    switch (type) {
        case 'SET_LANGUAGE':
            return changeLanguage(state, payload);
        case CHANGE_CATEGORY:
            return setCategory(state, payload);
        case 'SET_NEW_NUMBER_DOCUMENT': 
            return setNewNumberDoc(state, payload);
        case 'SET_NEW_FIRST_NAME_AND_LAST_NAME':
            return setNewSelfData(state, payload);
        case 'WHY_ISSUED_BY':
            return setNamingWhyIssued(state, payload);
        case 'SET_NEW_DATE': 
            return setNewDateIssued(state, payload);
        case 'SET_NEW_DATE_VALIDITY': 
            return setNewDateValidity(state, payload);
        case 'SET_PHONE': 
            return setNewDataPhone(state, payload);
        case 'SET_CMC': 
            return setNewCmc(state, payload);
        case 'TOGGLE_AGREE_CALL':
            return toggleDateAgreeCall(state, payload);
        case 'SET_RULE_CALL':
            return setNewDataCall(state, payload);
        case 'CHANGE_COUNT_CMC':
            return setNewCountCmc(state, payload);
        case 'SET_AUTH': 
            return setIsAuth(state, payload);
        case 'DELETED_CURRENT_TABLE':
            return removeCurrentTable(state, payload);
        case 'EDIT_CURRENT_TABLE':
            return editCurrentTable(state, payload);
        case 'CHANGE_NEW_DATA_FIELD':
            return changeNewDataField(state, payload);
        case 'UPDATE_CHANGED_TABLE':
            return updateCurrentTable(state, payload);
        case 'SET_NEW_TIME_INTERVAL':
            return updateNewTimeTimer(state, payload);
        case 'SET_NEW_TIME_INTERVAL_CMC':
            return updateNewTimeTimerCmc(state, payload);
        case 'CONFIRMED_PHONE':
            return confirmedPhone(state, payload);
        case 'RENDER_LIST':
            return renderCurrentTable(state, payload);
        case 'SET_OTHER_CHECKED_RADIO':
            return checkedOtherRadio(state, payload);
        case 'CLEAR_EDIT_DATA':
            return clearDataEdit(state);
        case 'CHANGE_PRELOADER':
            return togglePreloader(state, payload);
        case 'SET_ERROR':
            return toggleErrorShow(state, payload);
        case 'CHANGE_DATE_ISSUED':
            return setDateIssuedEdit(state, payload);
        case 'CHANGE_DATE_VALIDITY':
            return setNewDateValidityEdit(state, payload);
        case 'SAVE_TABLE_ROW_ID':
            return setTableRowId(state, payload);
        case 'REDIRECT_FOUND':
            return setRedirectFound(state,payload);
        case 'SUBMIT_BUTTON_ATTACH':
            return setSubmitButtonAttach(state, payload);
        case 'SET_CHANGE_TITLE':
            return setNewTitle(state, payload);
        case 'SET_AUTHORIZATION_THROUGH_MY_BOOK':
            return setMybookAuthorization(state, payload);
        default:
            return state;
    }
}
