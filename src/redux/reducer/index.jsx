import  fetch from 'isomorphic-fetch';
import {target} from '../../config/Config';
import {Tool} from '../../config/Tool';

export const SET_STATE = 'SET_STATE';
export const RECORD_STATE = 'RECORD_STATE';
export const SAVE_PRODUCT_LIST = 'SAVE_PRODUCT_LIST';
export const NEW_PRODUCT_DATA = 'NEW_PRODUCT_DATA';
export const DELETE_ITEM = 'DELETE_ITEM';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const GET_DATA_START = 'GET_DATA_START';
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
export const TEST_DISPATCH = 'TEST_DISPATCH';

//��ʼ��ȡ����
const requestPosts = path => {
    return {
        type: REQUEST_POSTS,
        path
    }
}

//��ȡ���ݳɹ�
const receivePosts = (path, json) => {
    return {
        type: RECEIVE_POSTS,
        path,
        json
    }
}

//
export const fetchPosts = (path, postData) => {
    let url = target + path + Tool.paramType(postData);
    return dispatch => {
        dispatch(requestPosts(postData));
        return fetch(url, {
            mode: 'no-cors'
        }).then(response => {
            if(response.ok){
                response.json().then(json => dispatch(receivePosts(path, json)))
            }else{
                console.log('status', response.status);
            }
        }).catch(error => console.log(error))
    }
}

//��¼������Ʒ�б�״̬
export const recordState = (id, chooseState, num, index) => {
    return {
        type: RECORD_STATE,
        id,
        chooseState,
        num,
        index
    }
}

//����Ʒ�б�����store�У�����ٴ���Ⱦʱ����
export const saveProductList = productList => {
    return {
        type: SAVE_PRODUCT_LIST,
        productList
    }
}

//������Ʒ�б�Ҳ�񵽵�������
export const newProductData = productData => {
    return {
        type: NEW_PRODUCT_DATA,
        productData
    }
}

//�����б�ҳɾ����λ��ITEM
export const deleteItem = index => {
    return {
        type: DELETE_ITEM,
        index
    }
}

const getDataStart = path => {
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
        dispatch(getDataStart(pathData));
        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'no-cors'
        })
        .then(response => response.json())
        .then(json => dispatch(getDataSuccess(path, json, success, name)))
        .catch(error => console.log(error))
    }
}

//��¼������Ʒ�б�״̬
export const testAction = (data) => {
    return {
        type: TEST_DISPATCH,
        data
    }
}















