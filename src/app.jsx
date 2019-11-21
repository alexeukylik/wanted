import React from 'react';
import {IntlProvider} from 'react-intl';

import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import Modules from './modules/modules.jsx';
import messages from './components/localization/localization';
import {setLanguage} from './modules/Public/actions/public.action';

import './styles/index.css';

function connector (store) {
    return store;
}

class AppRouter extends React.Component {

    componentDidMount() {
        if(localStorage.getItem('wanted.im_lang')) {
            this.props.dispatch(setLanguage(localStorage.getItem('wanted.im_lang')));
        } else {
            let lang = navigator.language || navigator.userLanguage;
            this.props.dispatch(setLanguage(lang === 'en-EN' ? 'en' : 'ru'));
        }
    }

    render() {
        return (
            <IntlProvider locale="en" messages={messages[this.props.main.language]}>
                <Modules />
            </IntlProvider>
        );
    }
}

export default withRouter(connect(connector)(AppRouter));