import {createStore, combineReducers, applyMiddleware} from 'redux';
import * as reducer from '../reducer/index';
import thunk from 'redux-thunk';