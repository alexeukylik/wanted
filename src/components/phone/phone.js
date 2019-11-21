import React, { useRef } from 'react';
import Button from '../button/button';
import {FormattedMessage} from 'react-intl';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/dist/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Phone = (props) => {
    const inputPhone = useRef(null);
    const [disabledBtn, setCount] = React.useState(true);

    React.useEffect(() => {
        inputPhone.current.focus();
        scrollToElement(inputPhone.current);
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

    const validationPhone = (phone) => {
        setCount(phone.length < 11);
        return phone.length > 10;
    };

    return (
        <div>
            <div className='h2'><FormattedMessage id={`${props.main.attach_button ? 'form_ready_attach' : 'form_ready'}`} /></div>
            <p><FormattedMessage id={`${props.text ? 'inner_phone_text' : props.main.attach_button ? 'form_ready_text_attach' : 'form_ready_text'}`} /></p>
            <form onSubmit={props.sendPhone} className='form needs-validation phone-form' noValidate>
                <div className='phone-input-block form__group' ref={inputPhone}>
                    <label className='form__label'><FormattedMessage id='phone_number' /></label>
                    <PhoneInput pattern='' inputClass={`form-control ${ props.main.phone.length < 19 ? 'was-validated input-phone' : ''}`} 
                        isValid={validationPhone} value={props.main.phone} onChange={props.setPhone} inputExtraProps={{
                        name: 'phone',
                        required: true,
                        autoFocus: true
                    }} 
                        defaultCountry={'ru'}
                        onKeyDown={props.setPhoneEnter}
                    />
                    <div className='valid-feedback'>Looks good!</div>
                    <div className='invalid-feedback'>Please provide a valid cmc</div>
                </div>
                <div className='btn-wrap'>
                    <Button type='submit' className='btn btn-success' disabled={disabledBtn}>
                        <FormattedMessage id='send_sms' />
                    </Button>
                    <Button onClick={props.close} type='button' className='btn btn-secondary'><FormattedMessage id='back' /></Button>
                </div>
            </form>
        </div>
    );
};

export default Phone;