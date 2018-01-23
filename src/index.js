import React from 'react';
import ReactDOM from 'react-dom';
import Index from './pages/index';
import URLS from './constants/Urls';
import Login from './pages/login';
import UserUtils from './constants/UserUtils';
import './component/iconfont/iconfont.css';
import './constants/Properties';
import axios from 'axios';
import {CircularProgress} from 'material-ui/Progress';
import purple from 'material-ui/colors/purple';

window.FORM_URLENCODED = function (obj) {
    let nameAndValues = [];
    for (let name in obj) {
        nameAndValues.push(`${name}=` + obj[name]);
    }
    return nameAndValues.join('&');
};

window.TIMESTAMP = function () {
    return new Date().getTime()
};

window.RANDOM_NUMBERS = function () {
    let nums = [];
    for (let i = 0; i < 9; i++) {
        nums.push(Math.floor(Math.random() * 10));
    }
    return nums.join('');
};

window.API_INFO = {
    apiKey: '6166025fd1e4ec9e2654488b84fd700f',
    applicationCode: '7REWTEKA7WB49VR6ESIW',
    randToken: window.RANDOM_NUMBERS(),
};
window.API_HEADER_INFO = {
    app_device: 'ios',
    'User-Agent': 'SkoutPlus/42600 CFNetwork/811.5.4 Darwin/16.6.0',
};

window.TRANSFORM_RESPONSE_JSON = [
    function (data) {
        if (data.indexOf('HTTP Status 403 - USER NOT LOGGED IN') !== -1) {
            this.status = 403;
            return {msg: '用户未登录'};
        }
        return JSON.parse(data);
    }
];
window.TRANSFORM_RESPONSE_TEXT = [
    function (data) {
        return data;
    }
];

window.TRANSFORM_RESPONSE_XML = [function (data) {
    let convertData = undefined;
    let oo = function (originObj, name, objTh) {
        if (objTh instanceof Object) {
            for (let _name in objTh) {
                if (_name.indexOf(':') !== -1) {
                    originObj[name.split(':')[1]] = originObj[name.split(':')[1]] || {};
                    let obj3 = objTh[_name][0];
                    oo(originObj[name.split(':')[1]], _name, obj3);
                }
            }
        } else {
            originObj[name.split(':')[1]] = objTh;
        }
    };
    data.xml2js(function (err, result) {
        if (err) {
            convertData = {
                description: 'xml转js失败'
            };
            return;
        }
        let obj = {};
        for (let name in result) {
            oo(obj, name, result[name]);
        }
        convertData = obj;
    });

    let getData = setInterval(function () {
        if (convertData !== undefined) {
            clearInterval(getData);
        }
    }, 1);
    return convertData;
}];

window.AXIOS = axios;
var EventEmitter = require('events').EventEmitter;
window.EVENT = new EventEmitter();
window.FETCH = axios.create({
    // baseURL:"https://some-domain.com/api/",
    timeout: 10 * 1000,
    crossDomain: true,
    transformRequest: [function (data) {
        if ((typeof data) === 'object') {
            return window.FORM_URLENCODED(data)
        }
        return data;
    }],
    transformResponse: window.TRANSFORM_RESPONSE_JSON,
    // headers: {'X-Custom-Header':'foobar'}
});
window.FETCH.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.message) {
        // 处理统一的验证失效错误.
        if (error.message === 'Network Error') {
            console.log("网络不给力,请检查.");
        } else if (error.message === 'timeout of 10000ms exceeded') {
            console.log("网络超时,请检查.");
        }
    }
    return Promise.reject(error);
});

window.FETCH.interceptors.request.use((config) => {
    if (config.headers['session_id'] !== undefined) {
        config.headers['session_id'] = localStorage.getItem('sessionId');
    }
    return config
});

let ws = new WebSocket("ws://localhost:3334/chat/v1.0");
ws.onopen = function (e) {
    ws.send(JSON.stringify({
        requestType: 'LOGIN',
        data: {
            username: "zhangyao123",
            password: 'lailake201314'
        }
    }))
};

let token = null;
ws.onmessage = function (e) {
    let result = JSON.parse(e.data);
    console.log.apply(console, ['onmessage', result]);
    if (result.resultType === "LOGIN_SUCCESS") {
        localStorage.setItem('sessionId', result.data);
        window.FETCH({
            url:'http://localhost:3334/user/v1.0/info/me',
            headers:{
                token:token
            }
        }).then(function (response) {
            localStorage.setItem('userInfo', JSON.stringify(response.data.data));
            window.EVENT.emit('userInfoReady',response.data.data);
        }).catch(function (error) {

        });

    } else if (result.resultType && result.resultType === 'INIT') {
        localStorage.setItem('token',result.msg);
        token = result.msg;
        console.log.apply(console, ['iyou初始化']);
    }

};

ws.onclose = function (message) {
    console.log.apply(console, ['onclose', message]);
};

ws.onerror = function (message) {
    console.log.apply(console, ['onerror', message]);
};

if(localStorage.getItem('userInfo')){
    window.EVENT.emit('userInfoReady',JSON.parse(localStorage.getItem('userInfo')));
}
let isRenderRoot = false;
window.EVENT.addListener('userInfoReady', function (readUserInfo) {
    if(isRenderRoot)return;
    isRenderRoot = true;
    window.USER_INFO = readUserInfo;
    ReactDOM.render(<Index/>, document.querySelector('#root'));
});
ReactDOM.render(<div style={{textAlign: 'center'}}><CircularProgress size={50}/>
</div>, document.querySelector('#root'));