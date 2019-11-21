import React from 'react';

const Button = (props) => {
    return (
        <button className="btn btn-secondary" {...props} >{props.children}</button>
    );
};

export default Button;

Button.defaultProps = {
    children: 'button',
};