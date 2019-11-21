import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import connector from './connector';
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';
import {
    setLanguage,
    setNumberDoc,
    setNewNameAndFamily,
    setWhyIssued,
    setChangeDateIssue,
    setChangeDateValidity,
    setCmc,
    setPhone,
    preparationPhone,
    toggleAgreeCall,
    setAgreeCall,
    login,
    setError,
    attachId,
} from './actions/public.action';
//import { redirectFound } from './actions/public.action';
import {togglePopup, togglePopupAuth, togglePopupCmc} from './../modal/actions/modal.actions';
import Form from './../../components/forma/forma';
import 'react-phone-number-input/style.css';
import Phone from '../../components/phone/phone';
import Cmc from '../../components/cmc/cmc';
import formatPhone from '../../helpers/formatPhone';
import { setFoundPage } from '../found/actions/found.action';
//import { setCurrentUser } from '../auth/action/public.acton';
//import setAuthorizationToken from '../../utils/setAuthhorizationToken';

export class Public extends React.Component {

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.auth.isAuthenticated) {
            this.props.dispatch(togglePopup(false));
            this.props.history.push('/profile/lost');
        }
        if((prevProps.modal.showPopup &&  !this.props.modal.showPopupCmc) || (prevProps.Found.found_page && !this.props.Found.found_page)) {
            this.props.dispatch(setChangeDateIssue(''));
            this.props.dispatch(setChangeDateValidity(''));
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.dispatch(togglePopup(false));
            this.props.history.push('/profile/lost');
        }
        this.props.dispatch(setFoundPage(false));
    }

    changeLanguage = (e) => {
        const language = e.target.dataset.local;
        localStorage.setItem('wanted.im_lang', language);
        this.props.dispatch(setLanguage(language));
    };

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
        this.props.dispatch(attachId(false));
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

            // delete
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
        this.props.dispatch(attachId(false));
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

            // delete
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

    showModal = (e, inputDoc, inputOwn, inputIssued) => {
        this.props.dispatch(attachId(true));
        e.preventDefault();
        e.target.className += ' was-validated';
        if (inputDoc.current.validity.valid && inputOwn.current.validity.valid && inputIssued.current.validity.valid) {
            this.props.dispatch(togglePopup(true));
        }
    };

    render() {
        // localStorage.setItem('imToken', JSON.stringify({
        //     token: '7f2adfe7-61d7-435b-b287-460646d1acc4',
        //     user: { id: 1, phone: '79114270134', name: null, surname: null, email: null }
        // }));
        return (
            <div className='page page_main' onClick={this.closeModal} ref={this.wrap}>
                <div className='page-part page-part_left' style={{backgroundImage: 'url(' + require('../../img/bg.png') + ')'}}>
                    <div className='page-part__info'>
                        <div className='page-part__title'><FormattedMessage id='main_title'/>
                        </div>
                        <div className='page-part__text'><FormattedHTMLMessage id='main_text'/>
                        </div>
                    </div>
                </div>
                <div className='page-part page-part_right'>
                    <div className='page__wrap'>
                        {
                            !this.props.modal.showPopup && !this.props.modal.cmcPopup ?
                                <Form {...this.props} showModal={this.showModal} inner={true}/> :
                                this.props.modal.showPopup ?
                                    <Phone
                                        sendPhone={this.sendPhone}
                                        setPhone={this.setPhone}
                                        disabledBtn={this.disabledBtn}
                                        close={this.close}
                                        setPhoneEnter={this.setPhoneEnter}
                                        {...this.props}
                                        disabled={this.props.main.timer < 5}
                                    /> : <Cmc
                                        setAuth={this.setAuth}
                                        setCmc={this.setCmc}
                                        setAgreeData={this.setAgreeData}
                                        agreeCall={this.agreeCall}
                                        showModal={this.showModal}
                                        sendPhone={this.sendPhone}
                                        disabled={this.props.main.timerCMC < 5}
                                        {...this.props}
                                    />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(connect(connector)(Public));