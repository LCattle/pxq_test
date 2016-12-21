import Reat, {Component, PropType} from 'react';
import { Router, Route, Redirect, IndexRoute, browserHistory, hasHistory} from 'react-router';

//销售录入
//import index from '../components/index';

class Roots extends Component{
    render() {
        return (
            <div>{this.props.children}</div>
        )
    }
}

const history = process.env.NODE_ENV !== 'production' ? browserHistory : hasHistory;

const chooseProducts = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../components/chooseProducts').default)
    }, 'chooseProducts')
}

const helpCenter = (loaction, cb) => {
    require.ensure([], require => {
        cb(null, require('../components/helpCenter').default)
    }, 'helpCenter')
}

const saleRecord = (location, cb) => {
    require.ensure([], require =>{
        cb(null, require('../components/helpCenter').default)
    }, 'saleRecord')
}

const allDeposit = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../components/allDeposit').default)
    }, 'allDeposit')
}

const applyRecord = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../components/applyRecord').default)
    }, 'applyRecord')
}

const applyDeposit = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../components/applyDeposit').default)
    }, 'applyDeposit')
}


const RouteConfig = (
    <Router history={history}>
        <Route path='/' component={Roots}>
            <IndexRoute component={index} />
            <Route path='index' component={index} />
            //帮助中心
            <Route path='helpCenter' getComponent={helpCenter} />
            //销售记录
            <Route path='saleRecord' getComponent={saleRecord} />
            //选择商品
            <Route path='chooseProducts' getComponent={chooseProducts} />
            //余额
            <Route path='allDeposit' getComponent={allDeposit} />
            //申请提现
            <Route path='applyDeposit' getComponent={applyDeposit} />
            //提现记录
            <Redirect from='*' to='/' />
        </Route>
    </Router>
);

export default RouteConfig;















