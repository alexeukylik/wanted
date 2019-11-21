import React from 'react';
import Button from './../button/buttons';

const ButtonGroup = ( { name, period, click, className}) => {
    return (
        <div>
            {
            name.map(element => {
                return (
                    <Button 
                        key={element}
                        onClick={click} 
                        className={`${period === element && 'active'} ${className}`} 
                        data-period={element}
                    >
                        {element}
                    </Button>);
            })
            }
        </div>
    );
};

export default ButtonGroup;
