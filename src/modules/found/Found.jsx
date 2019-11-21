import React from 'react';
import { withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import connector from './connector';
import Button from '../../components/button/button.js';
import Table from '../../components/table/table.js';
import { togglePopup, togglePopupAuth, togglePopupCmc } from '../modal/actions/modal.actions';
import LostFound from '../../components/lost-found/lost-found';
import {getFoundOwnerDocument, getFound, setFoundPage} from './actions/found.action';
import {FormattedMessage} from 'react-intl';
import Phone from '../../components/phone/phone';
import Cmc from '../../components/cmc/cmc';
import { setNumberDoc, setNewNameAndFamily, setWhyIssued, setChangeDateIssue, setChangeDateValidity, setError, login, setCmc, setPhone, toggleAgreeCall, setAgreeCall, redirectFound, preparationPhone } from '../Public/actions/public.action';
import formatPhone from '../../helpers/formatPhone';
//import { setCurrentUser } from '../auth/action/public.acton';
//import setAuthorizationToken from '../../utils/setAuthhorizationToken';

export class Found extends React.Component {

    static getDerivedStateFromProps(props) {
        if (!props.auth.isAuthenticated && props.history.location.pathname !== '/found') {
            props.history.push('/found');
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.main.redirect_found && this.props.auth.isAuthenticated) {
            this.props.dispatch(redirectFound(false));
            this.props.history.push('/profile/found');
            this.props.dispatch(togglePopupCmc(false));
            new Promise((res, rej)=> res(getFound(prevProps.main, this.props.dispatch)))
                .then(() => this.props.dispatch(getFoundOwnerDocument(prevProps.main.document_found_id)))
                .catch(()=> console.log('error found id'));
            return <Redirect push to="/profile/found" />;
        }
    }
    

    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.dispatch(setFoundPage(true));
            // this.props.history.push('/found');
        }
    }

    showModalContact = e => this.props.dispatch(getFoundOwnerDocument(this.props.main.document_found_id));
    showPopup = e => this.props.dispatch(togglePopupCmc(true));

    showPopupFindOwner = () => this.props.dispatch(togglePopupAuth(true));


    changeNumberDoc = e => this.props.dispatch(setNumberDoc(e.target.value));
    changeSelfData = e => this.props.dispatch(setNewNameAndFamily(e.target.value));
    whyIssued = e => this.props.dispatch(setWhyIssued(e.target.value));
    handleChangeDataIssue = date => this.props.dispatch(setChangeDateIssue(date));
    handleChangeValidity = date => this.props.dispatch(setChangeDateValidity(date));


    showModal = (e) => {
        e.preventDefault();
        this.props.dispatch(togglePopup(true));
    };

    showPopupAuth = e => this.props.dispatch(togglePopupAuth(true))
    close = (e) => {
        this.props.dispatch(togglePopup(false));
    }
    closeCmc = (e) => this.props.dispatch(togglePopupCmc(false))
    setCmc = (e, inputСmc) => {
        this.props.dispatch(setError(false));
        e.target.className += ' was-validated';
        this.props.dispatch(setCmc(e.target.value));
        if (inputСmc.current.validity.valid && e.target.value.length === 6) {
            this.props.dispatch(login({
                password: e.target.value,
                phone: formatPhone(this.props.main.phone),
                counter: this.props.main.counter_cmc
            }, this.props.main));
            this.props.dispatch(redirectFound(true));

            // delete
            // this.props.dispatch(redirectFound(true));
            // localStorage.setItem('imToken', JSON.stringify({
            //     token: '7f2adfe7-61d7-435b-b287-460646d1acc4',
            //     user: { id: 1, phone: '79114270134', name: null, surname: null, email: null }
            // }));
            // this.props.dispatch(setCurrentUser({
            //     token: '7f2adfe7-61d7-435b-b287-460646d1acc4',
            //     user: { id: 1, phone: '79114270134', name: null, surname: null, email: null }
            // }));
            // setAuthorizationToken('7f2adfe7-61d7-435b-b287-460646d1acc4');
            // this.props.dispatch(togglePopupCmc(false));
        }
    };
    setPhone = (number) => this.props.dispatch(setPhone(number));
    agreeCall = (e) => this.props.dispatch(toggleAgreeCall(e.target.checked));
    setAgreeData = (e) => this.props.dispatch(setAgreeCall(e.target.value));

    setPhoneEnter = (e) => {
        if (e.keyCode === 13) {
            this.props.dispatch(preparationPhone(this.props.main.phone, this.props.main.counter_cmc, this.close));
        }
    };

    sendPhone = (e) => {
        e.preventDefault();
        this.props.dispatch(preparationPhone(this.props.main.phone, this.props.main.counter_cmc, this.close));
        // delete
        // this.close();
        // this.props.dispatch(togglePopupCmc(true));
    };

    setAuth = (e, inputСmc) => {
        e.preventDefault();
        this.props.dispatch(setError(false));
        e.target.className += ' was-validated';
        if (inputСmc.current.validity.valid && e.target.value.length === 6) {
            this.props.dispatch(login({
                password: e.target.value,
                phone: formatPhone(this.props.main.phone),
                counter: this.props.main.counter_cmc
            }, this.props.main));
            this.props.dispatch(redirectFound(true));

            // delete
            // this.props.dispatch(redirectFound(true));
            // localStorage.setItem('imToken', JSON.stringify({
            //     token: '7f2adfe7-61d7-435b-b287-460646d1acc4',
            //     user: { id: 1, phone: '79114270134', name: null, surname: null, email: null }
            // }));
            // this.props.dispatch(setCurrentUser({
            //     token: '7f2adfe7-61d7-435b-b287-460646d1acc4',
            //     user: {id: 1, phone: '79114270134', name: null, surname: null, email: null}
            // }));
            // setAuthorizationToken('7f2adfe7-61d7-435b-b287-460646d1acc4');
            // this.props.dispatch(togglePopupCmc(false));
        }
    };

    showModal = (e, inputDoc, inputOwn, inputIssued) => {
        e.preventDefault();
        e.target.className += ' was-validated';
        if (inputDoc.current.validity.valid && inputOwn.current.validity.valid && inputIssued.current.validity.valid) {
            this.props.dispatch(togglePopup(true));
        }
    };

    render() {
        return (
            <React.Fragment>
                <div className={this.props.location.pathname !== '/' ? 'page page_inner' : 'page'}>
                    <div className='page-part page-part_full'>
                        <div className='profile'>
                            <LostFound showPopup={this.showPopup} showPopupFindOwner={this.showPopupFindOwner} {...this.props}/>
                            <Table data={this.props.Found} {...this.props} found={true}/>
                            {this.props.auth.isAuthenticated && this.props.Found.lists.length > 0 && this.props.main.document_found_id ?
                                <div>
                                    <h2 className='found-header'><FormattedMessage id='want_back'/></h2>
                                    <div style={{display: 'flex', justifyContent: 'center'}}>
                                        <Button className={'btn btn-success'} onClick={this.showModalContact}><FormattedMessage
                                            id='contact_owner'/></Button>
                                    </div>
                                </div> : ''}
                            {
                                !this.props.auth.isAuthenticated && this.props.Found.lists.length > 0 && this.props.main.document_found_id &&
                                <div>
                                    <h2 className='found-header'><FormattedMessage id='want_back'/></h2>
                                    <div style={{display: 'flex', justifyContent: 'center'}}>
                                        <Button type='button' className={'btn btn-success'} onClick={() => this.props.dispatch(togglePopup(true))}>
                                            <FormattedMessage id='contact_owner'/>
                                        </Button>
                                    </div>
                                </div>
                            }
                            {
                                !this.props.auth.isAuthenticated && this.props.modal.showPopup  &&
                                    <div className='popup-wrap'>
                                        <div className='popup__body'>
                                            <div className='popup_header'>
                                                <div className='popup__title'></div>
                                                <div className='popup__close' onClick={() => this.props.dispatch(togglePopup(false))}>
                                                    <svg className='icon icon-cross' width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                                        <path d='M2 14L14 2m0 12L2 2' stroke='#B3B6BA' />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className='popup__content'>
                                                {
                                                    <Phone
                                                        text={true}
                                                        sendPhone={this.sendPhone}
                                                        setPhone={this.setPhone}
                                                        disabledBtn={this.disabledBtn}
                                                        close={this.close}
                                                        setPhoneEnter={this.setPhoneEnter}
                                                        {...this.props}
                                                        disabled={this.props.main.timer < 5}
                                                    /> 
                                                }
                                                
                                            </div>
                                        </div>
                                    </div>
                            }
                            {
                                !this.props.auth.isAuthenticated && this.props.modal.cmcPopup &&
                                    <div className='popup-wrap'>
                                        <div className='popup__body'>
                                            <div className='popup_header'>
                                                <div className='popup__title'></div>
                                                <div className='popup__close' onClick={() => this.props.dispatch(togglePopupCmc(false))}>
                                                    <svg className='icon icon-cross' width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                                        <path d='M2 14L14 2m0 12L2 2' stroke='#B3B6BA' />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className='popup__content'>
                                                <Cmc
                                                    setAuth={this.setAuth}
                                                    setCmc={this.setCmc}
                                                    setAgreeData={this.setAgreeData}
                                                    agreeCall={this.agreeCall}
                                                    showModal={this.showModal}
                                                    sendPhone={this.sendPhone}
                                                    disabled={this.props.main.timerCMC < 5}
                                                    {...this.props}
                                                />
                                            </div>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(connect(connector)(Found));