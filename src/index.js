import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';

import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import Store from './store';
import setAuthorizationToken from './utils/setAuthhorizationToken.js';
import { setCurrentUser } from './modules/auth/action/public.acton.js';
import { getList } from './modules/Public/actions/public.action.js';

const app = document.getElementById('root');

if(localStorage.imToken) {
    const authData = JSON.parse(localStorage.getItem('imToken'));
    setAuthorizationToken(authData.token);
    Store.dispatch(setCurrentUser(authData));
    getList(Store.dispatch);
}

ReactDOM.render(
    <Provider store={Store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>, app);
