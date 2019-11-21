import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Timer from './../timer/timer';
import {FormattedMessage} from 'react-intl';


function connector(store) {
    return store;
}

const RemoveBlock = (props) => {
    const [displayState, setDisplay] = useState('flex');

    const displayBlock = ( dis ) => {
        if(dis) {
            setDisplay(dis);
        } else {
            setDisplay('flex');
        }
    };

    return (
        <div style={{  }}>
            <div className='remove-block' style={{ display: `${displayState}`, position: 'fixed', left: 0, width: '100%', height: '60px',bottom: `${props.bottom}`, zIndex: 100000 }}>
                <FormattedMessage id='doc'/>&nbsp;<b>ID&nbsp;<span>{props.id.id}</span></b>&nbsp;<FormattedMessage id='will_restore'/>
                <span><Timer {...props} startCount={20} displayBlock={displayBlock} cancelDeleteDocument={props.cancelDeleteDocument}/></span>
            </div> 
        </div>
    );
};

export default withRouter(connect(connector)(RemoveBlock));