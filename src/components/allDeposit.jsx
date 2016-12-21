import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import { Router, Route, IndexRoute, browserHistory, Link} from 'react-router';
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';
import { Tool } from '../config/Tool';
import { Header, template } from './common/mixin';

class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            allDeposit: 0
        }
    }
    componentWillUpdate(nextProps, nextState){
        if(this.props !== nextProps){
            let {data} = nextProps.state;
            this.state.allDeposit = data && data.data && data.data.data && data.data.data.balance || 0;
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        return !is(fromJs(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState));
    }

    render(){
        return (
            <div>
                <Header nav title='提现' applyRecord />
                <div>每笔金额不超过200元，每天最多3次</div>
                <div>
                    <div>可提现金额(元)</div>
                    <div>
                        <span>{this.state.allDeposit}</span>
                    </div>
                </div>
                <Link to={'/applyDeposit?allDeposit='+ this.state.allDeposit}>提现</Link>
            </div>
        )
    }
}


export default template({
    id: 'allDeposit',
    component: Main,
    url: '/balance/balance/getBalance'
})