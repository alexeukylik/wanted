import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import connector from './connector';
import { toggleModalError } from './actions/modal.actions';

const Modal = (props) => {

    const {modal: {showModal}, modalRef, dispatch} = props;

    const close = (e) => dispatch(toggleModalError(false));

    React.useEffect(()=> {
        if(showModal) {
            setTimeout(()=> dispatch(toggleModalError(false)), 3000);
        }
    });

    return (
        <div className={`alert-window ${(showModal) && 'show'}`}>
            <div className="alert-content" role="dialog" ref={modalRef} aria-modal={`${showModal}` && true} onClick={close}>
                <div className="alert-dialog" role="document">
                    <span className='alert-close' onClick={close}>✕</span>
                    {props.content}{props.modal.showModal}
                </div>
            </div>
        </div>
    );

};

export default withRouter(connect(connector)(Modal));