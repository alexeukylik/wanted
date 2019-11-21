import React from 'react';
import Button from '../button/button';

const ButtonLanguage = (props) => {
    return (
        <div className='btn-group'>
            <Button className={`${props.activeLang === 'en' && 'active'} btn btn_outlined btn_lang`} onClick={props.changeLanguage} data-local="en">Eng</Button>
            <Button className={`${props.activeLang === 'ru' && 'active'} btn btn_outlined btn_lang`} onClick={props.changeLanguage} data-local="ru">Рус</Button>
        </div>
    );
} ;

export default ButtonLanguage;