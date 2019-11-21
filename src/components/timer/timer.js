import React from 'react';
import { tickTimer, restoreDocument } from '../../modules/Public/actions/public.action';
import Button from '../button/button';
import { FormattedMessage } from 'react-intl';
import { saveTableRowId } from '../../modules/Profile/actions/profile.actions';

class Timer extends React.Component {
    state = {
        count: 1,
        expiring: false
    };

    componentDidMount() {
        const { startCount } = this.props;
        this.setState({
            count: startCount
        });
        this.doIntervalChange();
        if (this.props.displayBlock) this.props.displayBlock('flex');
    }

    doIntervalChange = () => {
        this.props.dispatch(saveTableRowId({id:this.props.id.id, remove: true}))
        this.myInterval = setInterval(() => {
            this.setState(prevState => ({ count: prevState.count - 1 }));
            if (this.state.count === 0) {
                clearInterval(this.myInterval);
                this.props.dispatch(tickTimer(false));
                if (this.props.displayBlock) { 
                    this.props.displayBlock('none'); 
                    this.props.id.btn.style.pointerEvents = 'auto';
                }
                this.props.changeCount(-1);
                this.props.deletedCurrentId(this.props.id);
                this.props.closeErrorBlock();
            }
        }, 1000);
    };

    componentWillUnmount() {
        clearInterval(this.myInterval);
    }

    cancelDelete = (id) => {
        this.props.dispatch(restoreDocument(this.props.id.id));
        this.props.dispatch(saveTableRowId({ id: this.props.id.id, remove: false }));
        clearInterval(this.myInterval);
        this.props.deletedCurrentId(id);
        id.btn.disabled = false;
        id.btn.style.pointerEvents = 'auto';
        this.props.changeCount(-1);
        this.props.closeErrorBlock();
    }

    render() {
        const { count } = this.state;
        return (
            <div>
                {count > 0 &&
                    <span>&nbsp;{count} <FormattedMessage id='second' />&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button onClick={() => this.cancelDelete(this.props.id)} className='btn btn-green'>
                            <FormattedMessage id='restore' />
                        </Button>
                    </span>}
            </div>
        );
    }
}

export default Timer;