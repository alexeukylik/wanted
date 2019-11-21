import React from 'react';
import { counterCmc } from '../../modules/Public/actions/public.action';
import { FormattedMessage } from 'react-intl';

class TimerBtn extends React.Component {
    state = { count: 1 };

    componentDidMount() {
        const {startCount } = this.props;
        this.setState({ count: startCount });
        this.doIntervalChange();
    }

    doIntervalChange = () => {
        this.myInterval = setInterval(() => {
            this.setState(prevState => ({ count: prevState.count - 1 }));
            if(this.state.count === 0) {
                clearInterval(this.myInterval);
                this.props.dispatch(counterCmc(0));
            }
        }, 1000);
    };

    componentWillUnmount () {
        clearInterval(this.myInterval);
    }

    render() {
        return (
            <span className="timer">
                <FormattedMessage id={this.props.text} />
                {this.state.count > 0 && <span>{this.state.count} </span>}
            </span>
        );
    }
}

export default TimerBtn;