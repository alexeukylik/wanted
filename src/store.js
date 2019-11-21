import {applyMiddleware, createStore, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';

import ModuleReducers from './modules/reducers';

const usedMiddleware = [thunk];

const combinedReducers = combineReducers(ModuleReducers);
const middleware = applyMiddleware(...usedMiddleware);

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
/* eslint-enable */

export default createStore(combinedReducers, composeEnhancers(middleware));
