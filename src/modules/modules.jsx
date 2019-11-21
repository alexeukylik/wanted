import React from 'react';
import {withRouter} from 'react-router-dom';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Header from './../components/Header/Header';
import Footer from './../components/Footer/Footer';

import connector from './connector';
import ModalView from '../components/modal-view/modalView.js';
import Preloader from '../components/preloader/preloader';
import Modal from './modal/modal.js';
export class Modules extends React.Component {
    render() {
        const {
            routs
        } = this.props;

        return (
            <React.Fragment>
                <Header />
                <Switch>
                    {   routs.map(route => (
                        <Route
                            exact={route.path === '/' && true}
                            key={route.name}
                            path={route.path}
                            component={route.component} />
                    ))}

                    <Redirect
                        from="/"
                        to={routs[0].path} />
                </Switch>
                <Footer />
                <ModalView {...this.props}/>
                <Preloader />
                <Modal
                    content={<div>
                        Error
                    </div>}
            />
            </React.Fragment>
        );
    }
}

export default withRouter(connect(connector)(Modules));
