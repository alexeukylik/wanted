import React, {useImperativeHandle, forwardRef, useRef} from 'react';
import './style.css';

const Input = (props, ref) => {
    
    const inputRef = useRef();
    useImperativeHandle(ref, () => {
        return inputRef.current;
    });

    return (
        <React.Fragment>
            {
                props.custom === 'checkbox' ? <label className='custom-checkbox'><input ref={inputRef} {...props} /><span></span></label> :
                    props.custom === 'radio' ? <label className='custom-radio'><input className={`${props.checked && ' active-radio'}`} ref={inputRef} {...props} /><span></span></label> :
                    <input ref={inputRef} {...props} />
            }
        </React.Fragment>
    );
};

export default forwardRef(Input);
