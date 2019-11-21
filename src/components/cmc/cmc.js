import React, {useRef} from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../button/button';
import Input from '../input/input';
import { FormattedMessage } from 'react-intl';
import TimerBtn from '../timerBtn/timer-btn';
import {togglePopup, togglePopupCmc} from '../../modules/modal/actions/modal.actions';
import { counterCmc } from '../../modules/Public/actions/public.action';


const Cmc = (props) => {
    const inputCmc = useRef(null);

    React.useEffect(() => {
        inputCmc.current.focus();
        scrollToElement(inputCmc.current);
    });

    function scrollToElement(theElement) {
        var selectedPosX = 0;
        var selectedPosY = 0;
        while (theElement != null) {
            selectedPosX += theElement.offsetLeft;
            selectedPosY += theElement.offsetTop;
            theElement = theElement.offsetParent;
        }
        window.scrollTo(selectedPosX, selectedPosY);
    }

    return (
        <div className='cmc'>
            <div className='h2'><FormattedMessage id='sms_sended' /></div>
            <p><FormattedMessage id='on_phone' /> <b>{props.main.phone}</b> <FormattedMessage id='sms_with_code' /></p>
            <p>
                <FormattedMessage id='not_received' />
                {props.main.counter_cmc > 1 ?
                    <TimerBtn startCount={60} text="code_timer" {...props} /> :
                    <span onClick={(e) => { props.dispatch(counterCmc(2)); props.sendPhone(e);}} >
                        <NavLink to="/" className='link link_blue'>&nbsp;<FormattedMessage id='resend' /></NavLink>
                    </span>}
            </p>
            <form onSubmit={(e) => props.setAuth(e, inputCmc)} className={`form needs-validation ${props.main.cmc.length >= 6 && 'was-validated'} ${props.main.error && 'was-validated '}`} noValidate>
                <div className='phone-input-block form__group'>
                    <label htmlFor='cmc' className="form__label"><FormattedMessage id='code_from' /></label>
                    <Input name='cmc' max="6" ref={inputCmc} onChange={(e)=>props.setCmc(e, inputCmc)} pattern='[0-9]{6,6}' value={props.main.cmc} id="cmc" className='form-control sms-code' required />
                    <div className="valid-feedback"></div>
                    <div className="invalid-feedback">{props.main.error ? <FormattedMessage id="invalidCode" />: <FormattedMessage id="wrongCode" />}</div>
                </div>
                <div className='btn-wrap'>
                    <Button type="submit" className='btn btn-success'>
                        <FormattedMessage id='enter_acc' />
                    </Button>
                    <Button type="button" onClick={() => {props.dispatch(togglePopupCmc(false));props.dispatch(togglePopup(true))}} className='btn btn-secondary'><FormattedMessage id='edit_phone' /></Button>
                </div>
            </form>
        </div>
    );
};

export default Cmc;