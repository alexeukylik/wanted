import React, {useRef} from 'react';
import {FormattedMessage} from 'react-intl';
import {NavLink} from 'react-router-dom';
import Input from './../input/input';
import Button from './../button/button';
import ModernDatepicker from '../../lib/';
import RadioGroup from '../radioGroup/radioGroup';
import {
    setNewCategory,
    setChangeDateIssue,
    setChangeDateValidity,
    setWhyIssued,
    setNewNameAndFamily,
    setNumberDoc,
    setError,
    setChangeTitle
} from '../../modules/Public/actions/public.action';
import {arrVolume} from '../../helpers/category';
import 'bootstrap/dist/css/bootstrap.min.css';
import {togglePopupCmc, togglePopupAuth} from '../../modules/modal/actions/modal.actions';
import {getFound } from '../../modules/found/actions/found.action';
import './style.css';
import moment from 'moment';

const Forma = (props) => {
    const inputDoc = useRef(null);
    const inputOwn = useRef(null);
    const inputIssued = useRef(null);
    const formEl = useRef(null);
    const handleChangeRadioKindDocument = (e) => props.dispatch(setNewCategory(e.target.value));

    const handleChangeDataIssue = date => {
        props.dispatch(setChangeDateIssue(date));
        handleLang();
    };
    const handleChangeValidity = date => props.dispatch(setChangeDateValidity(date));
    const handleChangeValidityInput = e => props.dispatch(setChangeDateValidity(moment(e.target.value).format('MM/DD/YYYY')));
    const handleChangeDataIssueInput = e => props.dispatch(setChangeDateIssue(moment(e.target.value).format('MM/DD/YYYY')));
    const foundDoc = (e) => {
        e.preventDefault();
        formEl.current.className += ' was-validated';
        if (inputDoc.current.validity.valid ) {
            props.history.push('/profile/found');
            props.dispatch(togglePopupAuth(false));
            getFound(props.main, props.dispatch);
        }
    };

    const dpClk = (e) => {
        handleLang();
    };

    const whyIssued = e => props.dispatch(setWhyIssued(e.target.value));
    const changeSelfData = e => props.dispatch(setNewNameAndFamily(e.target.value));
    const changeNumberDoc = e => props.dispatch(setNumberDoc(e.target.value));
    const handleLang = () => {
        if (props.main.language === 'en') return;
        let lang = {
            Jan: 'Янв',
            Feb: 'Фев',
            Mar: 'Март',
            Apr: 'Апр',
            May: 'Май',
            Jun: 'Июнь',
            Jul: 'Июль',
            Aug: 'Авг',
            Sep: 'Сен',
            Oct: 'Окт',
            Nov: 'Ноя',
            Dec: 'Дек',
            S: 'Вс',
            M: 'Пн',
            T: 'Вт',
            W: 'Ср',
            F: 'Пт'
        };

        let translate = ()=>{
            let aTags = document.querySelectorAll('.datepicker-wrap span');
            let words = [];
            for (let i = 0; i < aTags.length; i++) {
                let word = aTags[i].textContent;
                Object.keys(lang).map(function (key, index) {
                    if (key === word) {
                        if (!words.includes(lang[key])) {
                            words.push(lang[key]);
                            aTags[i].textContent = lang[key];
                        } else {
                            if (word === 'T') aTags[i].textContent = 'Чт';
                            if (word === 'S') aTags[i].textContent = 'Сб';
                        }
                    }
                    return key;
                });
            }
        };
        translate();

        setTimeout(() => {
            translate();
        });
    };

    const changeTitle = (e) => {
        console.log(e)
        props.dispatch(setChangeTitle(e.target.value))
    }

    const foundRedirect = () => { 
        if(inputDoc.current.validity.valid) {
            props.dispatch(togglePopupCmc(false));
            getFound(props.main, props.dispatch);
            props.history.push('/found');
        }
    };
    return (
        <form ref={formEl} className='form needs-validation' onSubmit={(e) => props.showModal(e, inputDoc, inputOwn, inputIssued)} noValidate>
            <div className='form__group'>
                <div className='form__label'><FormattedMessage id='what_doc'/></div>
                <RadioGroup value={arrVolume} type="radio" name="kindDocument" onChange={handleChangeRadioKindDocument} checked={props.main.category_doc} required/>
                <div className="valid-feedback"><FormattedMessage id="valid"/></div>
            </div>
            <div className='form__group'>
                <label htmlFor='owner-doc' className='form__label'><FormattedMessage id='title'/></label>
                <div className='input-group'>
                    <Input  id='title' className='form-control' onChange={changeTitle} value={props.main.title}/>
                </div>
            </div>
            <div className='form__group'>
                <label htmlFor='number_doc' className='form__label'><FormattedMessage id='what_number'/></label>
                <div className='input-group'>
                    <Input 
                        ref={inputDoc} pattern='^[a-zA-Z\d\-_.,!$%^*()+|~=`{}[:;<>?@#\]\s]+$'
                        className={props.main.number_doc.length === 0 ? 'empty required form-control' : 'required filled form-control'}
                        id="number_doc" onChange={changeNumberDoc}
                        value={props.main.number_doc} required
                    />
                    <div className="invalid-feedback"><FormattedMessage id="invalidNumber"/></div>
                    <div className="invalid-feedback empty-feedback"><FormattedMessage id="empty"/></div>
                </div>
            </div>
            <div className='form__group'>
                <label htmlFor='owner-doc' className='form__label'><FormattedMessage id='owner'/></label>
                <div className='input-group'>
                    <Input ref={inputOwn} id='owner-doc' className='form-control' onChange={changeSelfData} value={props.main.firstName_lastName}/>
                </div>
            </div>
            <div className='form__group'>
                <label htmlFor='why_issued' className='form__label'><FormattedMessage id='issued'/></label>
                <div className='input-group'>
                    <Input ref={inputIssued} id='why_issued' className='form-control' onChange={whyIssued} value={props.main.why_issued}/>
                </div>
            </div>
            <div className='form__group form__group_flex'>
                <div className='form__group_date'>
                    <label htmlFor='what_date-doc' className='form__label'><FormattedMessage id='what_date'/></label>
                    <span className='datepicker-wrap date-issued' onClick={dpClk}>
                        <ModernDatepicker
                            date={props.main.when_issued}
                            format={'DD/MM/YYYY'}
                            onFocus={handleLang}
                            showBorder
                            className='picker__position picker__visible'
                            onChange={handleChangeDataIssue}
                            lang={localStorage.getItem('wanted.im_lang')}
                        />
                        <Input className="picker__visible-mobile" type="date" onChange={handleChangeDataIssueInput} value={props.main.when_issued && moment(props.main.when_issued).format('YYYY-MM-DD')} />
                        <svg className='svg__visible' width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path
                            d="M1 3V2H0v1h1zm22 0h1V2h-1v1zm0 18v1h1v-1h-1zM1 21H0v1h1v-1zM6 1V0H4v1h2zM4 3v1h2V3H4zm16-2V0h-2v1h2zm-2 2v1h2V3h-2zm5 7h1V8h-1v2zM1 8H0v2h1V8zm0-4h22V2H1v2zm21-1v18h2V3h-2zm1 17H1v2h22v-2zM2 21V3H0v18h2zM4 1v2h2V1H4zm14 0v2h2V1h-2zm5 7H1v2h22V8zM6 12h2v2H6zM11 12h2v2h-2zM16 12h2v2h-2zM6 16h2v2H6zM11 16h2v2h-2zM16 16h2v2h-2z"
                            fill="#DCDCDC"/></svg>
                    </span>
                </div>
                <div className='form__group_date'>
                    <label htmlFor='what_validity-doc' className='form__label'><FormattedMessage
                        id='what_validity'/></label>
                    <span className='datepicker-wrap date-validity' onClick={dpClk}>
                        <ModernDatepicker
                            date={props.main.validity}
                            lang={localStorage.getItem('wanted.im_lang')}
                            format={'DD/MM/YYYY'}
                            onFocus={handleLang}
                            showBorder
                            onChange={handleChangeValidity}
                            className='picker__visible'
                        />
                        <Input className="picker__visible-mobile" type="date" onChange={handleChangeValidityInput} value={props.main.validity && moment(props.main.validity).format('YYYY-MM-DD')} />
                        <svg className='svg__visible' width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path
                            d="M1 3V2H0v1h1zm22 0h1V2h-1v1zm0 18v1h1v-1h-1zM1 21H0v1h1v-1zM6 1V0H4v1h2zM4 3v1h2V3H4zm16-2V0h-2v1h2zm-2 2v1h2V3h-2zm5 7h1V8h-1v2zM1 8H0v2h1V8zm0-4h22V2H1v2zm21-1v18h2V3h-2zm1 17H1v2h22v-2zM2 21V3H0v18h2zM4 1v2h2V1H4zm14 0v2h2V1h-2zm5 7H1v2h22V8zM6 12h2v2H6zM11 12h2v2h-2zM16 12h2v2h-2zM6 16h2v2H6zM11 16h2v2h-2zM16 16h2v2h-2z"
                            fill="#DCDCDC"/></svg>
                    </span>
                </div>
            </div>
            {
                props.inner ?
                    <div className='btn-wrap'>
                        <Button className='btn btn-success' type="submit"><FormattedMessage id='tie'/></Button>
                        <Button className='btn btn-dark' type='submit' onClick={foundRedirect}><FormattedMessage id='found'/></Button>
                    </div> :
                    <div className='btn-wrap'>
                        <Button className='btn btn-success' type="submit" onClick={foundDoc} ><FormattedMessage id='find'/></Button>
                        <Button className='btn btn-grey' onClick={() => props.dispatch(togglePopupAuth(false))}><FormattedMessage id='cancel'/></Button>
                    </div>
            }
        </form>
    );
};

export default Forma;