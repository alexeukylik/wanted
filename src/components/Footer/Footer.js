import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';

function connector(store) {
    return store;
}

const Footer = (props) => {
    return (
        <div className={props.location.pathname !== '/'?'footer footer_inner':'footer'}>
            <div className='footer__wrap'>
                <span className='footer__copyright'>© 2019 Wanted.im</span>
                <NavLink to='/policy' className='footer__link'>
                    <FormattedMessage id="policy_link"/>
                </NavLink>
            </div>
        </div>
    )
};

export default withRouter(connect(connector)(Footer));