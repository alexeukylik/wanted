import React from 'react';
import Radio from '../radio/radio';
import {FormattedHTMLMessage} from 'react-intl';

const RadioGroup = (props) => {
    return(
        <div className='tab-radio'>
            {
                props.value.map((element, key) => {
                    return (
                        <div className='tab-radio__item' key={element.category_id}>
                            <Radio
                                {...props}
                                id={'cat_'+element.category_id}
                                onChange={props.onChange}
                                className={props.className}
                                value={element.category_id}
                                name={props.name}
                                type={props.type}
                                required
                                checked={props.checked.toString() === props.value[key].category_id}
                            />
                            <label htmlFor={'cat_'+element.category_id}><FormattedHTMLMessage id={element.category}/></label>
                        </div>
                    );
                })
            }
        </div>
    );
};

export default RadioGroup;