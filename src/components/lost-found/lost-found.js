import React from 'react';
import Button from '../button/button';
import {FormattedMessage} from 'react-intl';
import {NavLink} from 'react-router-dom';
import {togglePopupAuth, togglePopupCmc} from '../../modules/modal/actions/modal.actions';

const LostFound = (props) => {

    const showModalPopup = () => props.dispatch(togglePopupCmc(true));
    const handleClick = () => window.location.replace('/');
    const showPopupFindOwner = () => props.dispatch(togglePopupAuth(true));

    return (
        <React.Fragment>
            <div className="tab">
                <div className="tab__left">
                    {props.auth.isAuthenticated && <span className="h1">
                        <NavLink className={props.location.pathname.split('/').pop() === 'lost' ? 'selected' : ''} to='/profile/lost'>
                            <FormattedMessage id='page_lost'/>
                        </NavLink>
                    </span>}
                    <span className="h1">
                        <NavLink className={props.location.pathname.split('/').pop() === 'found' ? 'selected' : ''} to={`${!props.auth.isAuthenticated ? '/found' : '/profile/found'}`}>
                            <FormattedMessage id='page_found'/>
                        </NavLink>
                    </span>
                </div>
                {props.auth.isAuthenticated ?
                    <div className="tab__right">
                        <div className='btn-wrap'>
                            <Button onClick={showModalPopup} className='btn btn-success' disabled={!props.auth.isAuthenticated}>
                                <FormattedMessage id='tie'/>
                            </Button>
                            <Button onClick={showPopupFindOwner} className='btn btn-dark' disabled={!props.auth.isAuthenticated}>
                                <FormattedMessage id='find_owner'/>
                            </Button>
                        </div>
                    </div> :
                    <div className="tab__right">
                        <div className='btn-wrap'>
                            <Button onClick={handleClick} className='btn btn-success' >
                                <FormattedMessage id='tie'/>
                            </Button>
                            <Button onClick={showPopupFindOwner} className='btn btn-dark'>
                                <FormattedMessage id='find_owner'/>
                            </Button>
                        </div>
                    </div>
                }
            </div>
        </React.Fragment>
    );
};

export default LostFound;