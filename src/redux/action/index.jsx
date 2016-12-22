import fetch from 'isomorphic-fetch';
import {target} from '../../config/Config';
import {Tool} from '../../config/Tool';

export const SET_STATE = 'SET_STATE';
export const RECORD_STATE = 'RECORD_STATE';
export const SAVE_PRODUCT_LIST = 'SAVE_PRODUCT_LIST';
export const NEW_PRODUCT_DATA = 'NEW_PRODUCT_DATA';
export const DELETE_ITEM = 'DELETE_ITEM';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
export const GET_DATA_START = 'GET_DATA_START';
export const TEST_DISPATCH = 'TEST_DISPATCH';

//开始获取数据
const requestPosts = path => {
	return {
		type: REQUEST_POSTS,
		path
	}
}

//获取数据成功
const receivePosts = (path, json) => {
	return {
		type: RECEIVE_POSTS,
		path,
		json
	}
}

export const fetchPosts = (path, postData) => {
	let url = target + path + Tool.paramType(postData);
	return  dispatch => {
		dispatch(requestPosts(postData));
		return fetch(url, {
			mode: 'no-cors'
		})
		.then(response => {
			if(response.ok){
				response.json()then(json => dispatch(receivePosts(path, json)))
			}else{
				console.log('status', response.status);
			}
		})
		.catch(error => console.log(error))
	}
}

//记录单个商品列表
export const recordState = (id, chooseState, num, index) => {
	return {
		type: RECORD_STATE,
		id, 
		chooseState,
		num, 
		index
	}
}

//将商品列表保存在store中，组件再次渲染时调用
export const saveProductList = productList => {
	return {
		type: SAVE_PRODUCT_LIST,
		productList
	}
}

//保存商品列表也获取到的数据
export const newProductData = productData => {
	return {
		type: NEW_PRODUCT_DATA,
		productData
	}
}

//销售列表页删除单个item
export const deleteItem = index => {
	return {
		type: DELETE_ITEM,
		index
	}
}

export const getDataStart = path => {
	return {
		type: GET_DATA_START,
		path
	}
}

const getDataSuccess = (path, json, success, name) => {
	return {
		type: GET_DATA_SUCCESS,
		path, 
		json,
		success, 
		name
	}
}

export const getData = (path, postData, success, name) => {
	let url = target + path + Tool.paramType(postData);
	return dispatch => {
		dispatch(getDataStart(postData))
		return fetch(url, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json'
			},
			mode: 'no-cors'
		})
		.then(response => response.json())
		.then(json => dispatch(getDataSuccess(path, postData, success, name)))
		.catch(error => console.log(error))
	}
}

//记录单个商品列表状态
export const testAction = (data) => {
	return {
		type: TEST_DISPATCH,
		data
	}
}

