import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout, setLanguage, myBookAuthorization } from './../../modules/Public/actions/public.action';
import {NavLink} from 'react-router-dom';
import ButtonLanguage from '../buttonsLanguage/buttonsLanguage';
import {FormattedMessage} from 'react-intl';
import {togglePopup} from '../../modules/modal/actions/modal.actions';
import handleSession from '../../helpers/sessionControl';

function connector(store) {
    return store;
}

const Header = (props) => {

    React.useEffect(() => {
        handleSession(props.dispatch);
    });

    const auth = () => {
        if (props.auth.isAuthenticated) {
            props.dispatch(logout());
        }
    };

    const changeLanguage = (e) => {
        const language = e.target.dataset.local;
        localStorage.setItem('wanted.im_lang', language);
        props.dispatch(setLanguage(language));
    };

    const showModal = (e) => {
        e.preventDefault();
        props.dispatch(togglePopup(true));
        props.dispatch(myBookAuthorization(true));
    };

    return (
        <div className={props.location.pathname !== '/'?'header header_inner':'header'}>
            <div className='header-part header-part_left'>
                <div className='header__logo'>
                    <NavLink to='/'>
                        <img className='header__logo-img' src={require(`../../img/${props.location.pathname === '/'?'logo':'logo_bl'}.png`)} alt='wanted.im'/>
                    </NavLink>
                </div>
            </div>
            <div className='header-part header-part_right'>
                <div className='header__wrap'>
                    <div className='header__lang'>
                        <ButtonLanguage changeLanguage={changeLanguage} activeLang={props.main.language}></ButtonLanguage>
                    </div>
                    {props.auth.isAuthenticated ?
                        <div className='header__logged'>
                            <span className='header__phone'> { props.auth.user.phone ? '+'+props.auth.user.phone : 'User'}</span>
                            <button className='header__logout' onClick={auth}><FormattedMessage id='logout'/> <svg width='16' height='17' fill='none' xmlns='http://www.w3.org/2000/svg'><g stroke='#B3B6BA'><path d='M13 4.833v-2a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2h6a2 2 0 002-2v-2M8 8.333h6m0 0l-2-2m2 2l-2 2'/></g><defs><clipPath id='clip0'><path fill='#fff' transform='translate(0 .333)' d='M0 0h16v16H0z'/></clipPath></defs></svg></button>
                        </div> :
                        <div onClick={showModal}>
                            <NavLink to='/' className='header__link'><FormattedMessage
                                id='btn_lost_found'/></NavLink>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default withRouter(connect(connector)(Header));