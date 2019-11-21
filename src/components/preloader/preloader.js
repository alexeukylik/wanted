import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './style.css';
import { changeStatePreloader } from '../../modules/Public/actions/public.action';
import { toggleModalError } from '../../modules/modal/actions/modal.actions';

function connector(store) {
    return store;
}

const Preloader = (props) => {

    const timerStart = () => {
        setTimeout(()=> {
            props.dispatch(changeStatePreloader(false)); 
            if(props.modal.showModal) {
                props.dispatch(toggleModalError(props.modal.showModal));
            }
        } , 10000);
    };

    React.useEffect(() => {
        props.main.preloader && timerStart() 
    });

    return (
        <React.Fragment>
            {props.main.preloader &&
                <div className='preloader'>
                    <div className='preloader__body'></div>
                </div>}
        </React.Fragment>
    );
};

export default withRouter(connect(connector)(Preloader));