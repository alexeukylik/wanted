import { removeCurrentUser } from '../modules/auth/action/public.acton';

const criticalTime = () => {
    const currentTime = Date.now();
    const limitTime = 21600000;
    const maxTime = currentTime + limitTime;
    return maxTime;
};

const handleSession = (dispatch) => {
    if (localStorage.wantedSession) {
        const maxTime = JSON.parse(localStorage.getItem('wantedSession'));
        if (maxTime <= Date.now()) {
            localStorage.removeItem('wantedSession');
            localStorage.removeItem('imToken');
            dispatch(removeCurrentUser());
        } else {
            localStorage.setItem('wantedSession', JSON.stringify(criticalTime()));
        }
    } else {
        localStorage.setItem('wantedSession', JSON.stringify(criticalTime()));
    }
};

export default handleSession;