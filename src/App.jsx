import React, {Component, PropTypes} from 'react';
import ReactDom, {render} from 'react-dom';
import {Provider} from 'react-redux';
import route from './router/router';
import store from './redux/store/store';
import './config/config.js';

store.subscribe(() => {
    console.log()
});

var HelloMessage = React.createClass({
    render: function() {
        return <h1>
        Hello world!
        </h1>
    }
});
render(<HelloMessage />, document.body)