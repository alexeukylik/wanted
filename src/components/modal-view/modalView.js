import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import Modal from '../../modules/modal/modal';
import ModalContent from '../modal-content.js/modal-content';
import Button from '../button/button';
import { togglePopupAuth, togglePopupContact, togglePopupCmc, togglePopup, togglePopupSuccess } from '../../modules/modal/actions/modal.actions';
import Input from './../input/input';
import Forma from '../forma/forma';
import FormaEdit from '../formaEdit/formaEdit';
import { createDocument } from '../../modules/Public/actions/public.action';
import { FormattedMessage } from 'react-intl';
import { editClear } from '../../modules/found/actions/found.action';

function connector(store) {
    return store;
}

const ModalView = (props) => {

    const enterPhone = e => console.log(e);

    const showModal = (e, inputDoc, inputOwn, inputIssued) => {
        props.dispatch(editClear);
        e.preventDefault();
        e.target.className += ' was-validated';
        if (inputDoc.current.validity.valid && inputOwn.current.validity.valid && inputIssued.current.validity.valid) {
            props.dispatch(togglePopupCmc(false));
            createDocument(props.main, props.dispatch);
            props.history.location.pathname === '/' && props.dispatch(togglePopupSuccess(true));
            props.history.location.pathname === '/profile/found' && props.history.push('/profile/lost') && props.dispatch(togglePopupAuth(false));
            props.history.location.pathname === '/found' && props.history.push('/profile/lost');
        }
    };

    const showModalFind = (e, inputDoc, inputOwn, inputIssued) => {
        e.preventDefault();
        e.target.className += ' was-validated';
        if (inputDoc.current.validity.valid && inputOwn.current.validity.valid && inputIssued.current.validity.valid) {
            props.dispatch(togglePopupAuth(false));
            props.history.push('/profile/found');
        }
    };

    return ((props.history.location.pathname !== '/') ? <div className='popup'>
        {
            props.modal.showPopup && props.auth.isAuthenticated &&
            <div className='popup-wrap'>
                <div className='popup__body'>
                    <div className='popup_header'>
                        <div className='popup__title'><FormattedMessage id='edit_doc' /></div>
                        <div className='popup__close' onClick={() => props.dispatch(togglePopup(false))}>
                            <svg className='icon icon-cross' width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path d='M2 14L14 2m0 12L2 2' stroke='#B3B6BA'/>
                            </svg>
                        </div>
                    </div>
                    <div className='popup__content'>
                        <FormaEdit {...props} />
                    </div>
                </div>
            </div>
        }
        {
            props.modal.cmcPopup && props.auth.isAuthenticated &&
            <div className='popup-wrap'>
                <div className='popup__body'>
                    <div className='popup_header'>
                        <div className='popup__title'><FormattedMessage id='attach' /></div>
                        <div className='popup__close' onClick={() => props.dispatch(togglePopupCmc(false))}>
                            <svg className='icon icon-cross' width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path d='M2 14L14 2m0 12L2 2' stroke='#B3B6BA'/>
                            </svg>
                        </div>
                    </div>
                    <div className='popup__content'>
                        <Forma {...props} showModal={showModal} inner={true}/>
                    </div>
                </div>
            </div>
        }
        {
            props.modal.showPopup_auth &&
            <div className='popup-wrap'>
                <div className='popup__body'>
                    <div className='popup_header'>
                        <div className='popup__title'><FormattedMessage id='found_doc' />?</div>
                        <div className='popup__close' onClick={() => props.dispatch(togglePopupAuth(false))}>
                            <svg className='icon icon-cross' width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path d='M2 14L14 2m0 12L2 2' stroke='#B3B6BA'/>
                            </svg>
                        </div>
                    </div>
                    <div className='popup__content'>
                        <Forma {...props} showModal={showModalFind}/>
                    </div>
                </div>
            </div>
        }
        {
            props.modal.contact &&
            <Modal
                content={<ModalContent
                    {...props}
                    title='контакт'
                    table={
                        <div>
                            контакт
                            <div className='modal-body input-group' style={{display: 'flex', margin: '0 auto', width: '280px'}}>
                                Чтобы узнать телефон владельца укажите свой номер, на него придёт смс с номером
                                владельца
                                Чтобы отправить телефон владельцу укажите свой номер для верификации и отправки
                                владельцу
                            </div>
                            <Input onChange={enterPhone} type='tel' className='form-control' name='usrtel' required/>
                            <Button onClick={() => props.dispatch(togglePopupContact(false))}>Close</Button>
                        </div>
                    }
                />}
            />
        }
        {props.modal.success &&
            <div className='popup-wrap'>
                <div className='popup__body'>
                    <div className='popup_header'>
                        <div className='popup__title'> </div>
                        <div className='popup__close' onClick={() => props.dispatch(togglePopupSuccess(false))}>
                            <svg className='icon icon-cross' width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path d='M2 14L14 2m0 12L2 2' stroke='#B3B6BA'/>
                            </svg>
                        </div>
                    </div>
                    <div className='popup__content'>
                        <p><FormattedMessage id='doc_phone_owner' />:<br/>
                            <a style={{ fontSize: '24px', color: 'var(--blue)' }} className='popup__phone' href={`tel:${props.Found.phone_owner}`}>
                                {props.Found.phone_owner}
                            </a>
                        </p>
                        <br/>
                        <p>Вернув вещь ее владельцу вы совершите хорошое дело и каждый владелец готов вернуть 20% от стоиости своей вещи, как вознаграждение.</p>
                    </div>
                </div>
            </div>
        }

    </div> : '');
};
export default withRouter(connect(connector)(ModalView));