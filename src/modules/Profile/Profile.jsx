import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import connector from './connector';
import { currentEditTable, setNewDataField, setNewChangeRadio} from './actions/profile.actions';
import { setChangeDateIssue, updateDoc, deleteDocument, getList} from './../Public/actions/public.action';

import {togglePopup, togglePopupAuth, togglePopupCmc} from './../modal/actions/modal.actions';
import {FormattedMessage} from 'react-intl';
import LostFound from '../../components/lost-found/lost-found';
import RemoveBlock from './../../components/removeBlock/removeBlock';
import Table from '../../components/table/table';

export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.id = '';
        this.localTimer = '';
        this.ids = [];
    }

    state = {
        counter: 0,
        errorBlock: false,
        ids: [],
    };
    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.auth.isAuthenticated ) {
            this.props.dispatch(togglePopup(false));
            this.props.history.push('/');
        }
    }

    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
        if(!this.props.main.lists.length > 0) {
            getList(this.props.dispatch);
        }
    }

    changeCount = (count) => {
        if (count) {
            this.setState({counter: this.state.counter - 1});
        } else {
            this.setState({counter: this.state.counter + 1});
        }
    };

    deleteTable = (e, id) => {
        const btn = e.currentTarget;
        new Promise((res, rej) => {
            res(this.props.dispatch(deleteDocument(id)));
        }).then(() => {
            if (this.state.ids.length <= 2) {
                this.changeCount();
                this.setState({ errorBlock: false });
                this.setState({ ids: [...this.state.ids, { id: id, btn: btn }] });
            } else {
                this.setState({ errorBlock: true });
            }
        });
    };

    deletedCurrentId = (oldId) => {
        const newIds = this.state.ids.filter(id => id !== oldId);
        this.setState({ids: [...newIds]});
    }

    closeErrorBlock = () => {
        this.setState({errorBlock: false});
    }

    cancelDeleteTable = () => {
        clearTimeout(this.localTimer);
    }

    editTable = (e, element) => {
        this.props.dispatch(currentEditTable(element.id));
        this.props.dispatch(togglePopup(true));
    };

    updateField = e => this.props.dispatch(setNewDataField(e.target.value, e.target.dataset.name));

    save = () => this.props.dispatch(updateDoc(this.props.main.edit));

    handleChange = date => this.props.dispatch(setChangeDateIssue(date));

    showModalPopup = () => this.props.dispatch(togglePopupCmc(true));

    showPopupFindOwner = () => this.props.dispatch(togglePopupAuth(true));

    handleChangeRadio = (e, title) => this.props.dispatch(setNewChangeRadio(title));


    render() {
        return (
            <div className={this.props.location.pathname !== '/'?'page page_inner':'page'}>
                <div className='page-part page-part_full'>
                    <div className='profile'>
                        <LostFound showPopup={this.showModalPopup} showPopupFindOwner={this.showPopupFindOwner} {...this.props}/>
                        <Table 
                            {...this.props} 
                            counter={this.state.counter} 
                            table={true} 
                            editTable={this.editTable} 
                            data={this.props.main}
                            deleteTable={this.deleteTable}
                        />
                    </div>
                </div>
                {
                    this.state.ids.map((id, index) => <RemoveBlock
                        closeErrorBlock={this.closeErrorBlock} {...this.props} deletedCurrentId={this.deletedCurrentId}
                        changeCount={this.changeCount} cancelDeleteTable={this.cancelDeleteTable}
                        bottom={`${+index * 60}px`} counter={this.state.counter} id={id} key={id.id} />)
                }
                {this.state.errorBlock  &&
                    <div className="remove-block fading" style={{ display: 'flex', position: 'fixed', left: 0, width: '100%', height: '60px', bottom: '180px', zIndex: 100000 }} >
                        <FormattedMessage id="remove_limit" />
                    </div>
                }
            </div>
        );
    }
}

export default withRouter(connect(connector)(Profile));