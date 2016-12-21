import Reat, {Component, PropType} from 'react';
import { Router, Route, Redirect, IndexRoute, browserHistory, hasHistory} from 'react-router';

//����¼��
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
            //��������
            <Route path='helpCenter' getComponent={helpCenter} />
            //���ۼ�¼
            <Route path='saleRecord' getComponent={saleRecord} />
            //ѡ����Ʒ
            <Route path='chooseProducts' getComponent={chooseProducts} />
            //���
            <Route path='allDeposit' getComponent={allDeposit} />
            //��������
            <Route path='applyDeposit' getComponent={applyDeposit} />
            //���ּ�¼
            <Redirect from='*' to='/' />
        </Route>
    </Router>
);

export default RouteConfig;















