import React from 'react';
import { toggleModalError } from '../../modules/modal/actions/modal.actions';

const ModalContent = (props) => {
    return (
        <div className='modal-content'>
            <div className='modal-header' style={{ display: 'flex', justifyContent: 'center' }}>
                <div className='modal-title'>{props.title}</div>
                <button type='button' className='close' data-dismiss='modal' aria-label='Close' onClick={() => { props.dispatch(toggleModalError(false));}}>
                    <span aria-hidden='true'>×</span>
                </button>
            </div>
            {props.table}
            <div className='modal-footer'>
            </div>
        </div>
    );
};

export default ModalContent;