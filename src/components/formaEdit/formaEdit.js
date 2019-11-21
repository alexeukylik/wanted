import React, { useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import Input from './../input/input';
import Button from './../button/button';
import RadioGroup from '../radioGroup/radioGroup';
import ModernDatepicker from '../../lib/';
import { updateDoc, changeDateIssued, changeDateValidity } from '../../modules/Public/actions/public.action';
import { arrVolume } from '../../helpers/category';
import 'bootstrap/dist/css/bootstrap.min.css';
import { togglePopup, togglePopupAuth } from '../../modules/modal/actions/modal.actions';
import { setNewDataField } from '../../modules/Profile/actions/profile.actions';
import { getFound } from '../../modules/found/actions/found.action';
import './../forma/style.css';
import moment from 'moment';


const FormaEdit = (props) => {
    const inputDoc = useRef(null);
    const inputOwn = useRef(null);
    const inputIssued = useRef(null);

    const showModal = (e) => {
        e.preventDefault();
        e.target.className += ' was-validated';
        if (inputDoc.current.validity.valid && inputOwn.current.validity.valid && inputIssued.current.validity.valid) {
            props.dispatch(togglePopup(true));
        }
    };

    const foundDoc = (e) => {
        e.preventDefault();
        props.history.push('/profile/found');
        props.dispatch(togglePopupAuth(false));
        getFound(props.main.edit, props.dispatch);
    };

    const handleChangeIssued = date => props.dispatch(changeDateIssued(date));
    const handleChangeValidity = date => props.dispatch(changeDateValidity(date));
    const handleChangeValidityInput = e => props.dispatch(changeDateValidity(moment(e.target.value).format('MM/DD/YYYY')));
    const handleChangeDataIssueInput = e => props.dispatch(changeDateIssued(moment(e.target.value).format('MM/DD/YYYY')));
    const updateField = e => props.dispatch(setNewDataField(e.target.value, e.target.dataset.name, e.target.dataset.extra));
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

    const dpClk = (e) => {
        handleLang();
    };
    const save = () => { props.dispatch(updateDoc(props.main.edit, props.main)); props.dispatch(togglePopup(false));};

    return (
        <form className='form needs-validation' onSubmit={showModal} noValidate>
            <div className='form__group'>
                <div className='form__label'><FormattedMessage id='what_doc'/></div>
                <RadioGroup data-name='category_id' onChange={updateField} value={arrVolume} type='radio' name='kindDocument'
                    checked={props.main.edit.category_id} required/>
                <div className='valid-feedback'><FormattedMessage id='valid' /></div>
            </div>
            <div className='form__group'>
                <label htmlFor='owner-doc' className='form__label'><FormattedMessage id='title'/></label>
                <div className='input-group'>
                    <Input  id='title' data-name='title' className='form-control' onChange={updateField} value={props.main.edit.extra.title}/>
                </div>
            </div>
            <div className='form__group'>
                <label htmlFor='number_doc' className='form__label'><FormattedMessage id='what_number' /></label>
                <div className='input-group'>
                    <Input ref={inputDoc}
                        pattern='^[a-zA-Z\d\-_.,!$%^*()+|~=`{}[:;<>?@#\]\s]+$'
                        className='form-control'
                        id='number_doc'  data-name={`extra`} data-extra={['number']} onChange={updateField} value={props.main.edit.extra.number !== 'null' ? props.main.edit.extra.number : ''} required />
                    <div className='valid-feedback'><FormattedMessage id='valid' /></div>
                    <div className='invalid-feedback'><FormattedMessage id='invalid' /></div>
                </div>
            </div>
            <div className='form__group'>
                <label htmlFor='owner-doc' className='form__label'><FormattedMessage id='owner' /></label>
                <div className='input-group'>
                    <Input ref={inputOwn} id='owner-doc' pattern='^[a-zA-Z\d\s]+$' className='form-control'
                        data-name='owner' onChange={updateField} value={props.main.edit.owner !== 'null' ? props.main.edit.owner : ''} />
                    <div className='valid-feedback'><FormattedMessage id='valid' /></div>
                    <div className='invalid-feedback'><FormattedMessage id='invalid' /></div>
                </div>
            </div>
            <div className='form__group'>
                <label htmlFor='why_issued' className='form__label'><FormattedMessage id='issued' /></label>
                <div className='input-group'>
                    <Input ref={inputIssued} id='why_issued' pattern='^[a-zA-Z\d\s]+$' className='form-control'
                        data-name={`extra`} data-extra={['organization']} onChange={updateField} value={props.main.edit.extra.organization !== 'null' ? props.main.edit.extra.organization : ''} />
                    <div className='valid-feedback'><FormattedMessage id='valid' /></div>
                    <div className='invalid-feedback'><FormattedMessage id='invalid' /></div>
                </div>
            </div>
            <div className='form__group form__group_flex'>
                <div className='form__group_date'>
                    <label htmlFor='what_date-doc' className='form__label'><FormattedMessage id='what_date' /></label>
                    <span className='datepicker-wrap date-issued' onClick={dpClk}>
                        <ModernDatepicker
                            props={props}
                            date={props.main.edit.extra.data !== 'null' ? props.main.edit.extra.data : ''}
                            onFocus={handleLang}
                            format={'DD/MM/YYYY'}
                            showBorder
                            lang={props.main.language}
                            onChange={handleChangeIssued}
                            className='picker__position picker__visible'
                        />
                        <Input id="dt" className="picker__visible-mobile" type='date'
                            onChange={handleChangeDataIssueInput}
                            value={props.main.edit.extra.data && moment(props.main.edit.extra.data).format('YYYY-MM-DD')}
                        />
                        <svg className='svg__visible' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'><path
                            d='M1 3V2H0v1h1zm22 0h1V2h-1v1zm0 18v1h1v-1h-1zM1 21H0v1h1v-1zM6 1V0H4v1h2zM4 3v1h2V3H4zm16-2V0h-2v1h2zm-2 2v1h2V3h-2zm5 7h1V8h-1v2zM1 8H0v2h1V8zm0-4h22V2H1v2zm21-1v18h2V3h-2zm1 17H1v2h22v-2zM2 21V3H0v18h2zM4 1v2h2V1H4zm14 0v2h2V1h-2zm5 7H1v2h22V8zM6 12h2v2H6zM11 12h2v2h-2zM16 12h2v2h-2zM6 16h2v2H6zM11 16h2v2h-2zM16 16h2v2h-2z'
                            fill='#DCDCDC' /></svg>
                    </span>
                </div>
                <div className='form__group_date'>
                    <label htmlFor='what_validity-doc' className='form__label'><FormattedMessage
                        id='what_validity' /></label>
                    <span className='datepicker-wrap date-validity' onClick={dpClk}>
                        <ModernDatepicker
                            date={props.main.edit.extra.validity !== 'null' ? props.main.edit.extra.validity : ''}
                            format={'DD/MM/YYYY'}
                            showBorder
                            onFocus={handleLang}
                            onChange={handleChangeValidity}
                            lang={props.main.language}
                            className='picker__visible'
                        />
                        <Input className="picker__visible-mobile" type='date'
                            onChange={handleChangeValidityInput}
                            value={props.main.edit.extra.validity && moment(props.main.edit.extra.validity).format('YYYY-MM-DD')}
                        />
                        <svg className='svg__visible' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'><path
                            d='M1 3V2H0v1h1zm22 0h1V2h-1v1zm0 18v1h1v-1h-1zM1 21H0v1h1v-1zM6 1V0H4v1h2zM4 3v1h2V3H4zm16-2V0h-2v1h2zm-2 2v1h2V3h-2zm5 7h1V8h-1v2zM1 8H0v2h1V8zm0-4h22V2H1v2zm21-1v18h2V3h-2zm1 17H1v2h22v-2zM2 21V3H0v18h2zM4 1v2h2V1H4zm14 0v2h2V1h-2zm5 7H1v2h22V8zM6 12h2v2H6zM11 12h2v2h-2zM16 12h2v2h-2zM6 16h2v2H6zM11 16h2v2h-2zM16 16h2v2h-2z'
                            fill='#DCDCDC' /></svg>
                    </span>
                </div>
            </div>
            {
                !props.inner ?
                    <div className='btn-wrap'>
                        <Button className='btn btn-success' onClick={save}><FormattedMessage id='save' /></Button>
                        <Button className='btn btn-grey' onClick={() => { props.dispatch(togglePopup(false)); }}><FormattedMessage id='cancel' /></Button>
                    </div> :
                    <div className='btn-wrap'>
                        <Button className='btn btn-success' onClick={foundDoc} type="submit"><FormattedMessage id='find' /></Button>
                        <Button className='btn btn-grey' onClick={() => props.dispatch(togglePopupAuth(false))}><FormattedMessage id='cancel' /></Button>
                    </div>
            }
        </form>
    );
};

export default FormaEdit;