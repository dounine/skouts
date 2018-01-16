import React from 'react';
import ReactDOM from 'react-dom';
import Index from './pages/index';
import URLS from './constants/Urls';
import Login from './pages/login';
import UserUtils from './constants/UserUtils';
import './component/iconfont/iconfont.css';
import './constants/Properties';
import axios from 'axios';
import { CircularProgress } from 'material-ui/Progress';
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

function login({username, password}) {
    let userInfo = {
        ...window.API_INFO,
        device_id: '',
        device_ifa: '00000000-0000-0000-0000-000000000000',
        device_ifv: '752D0B22-DDFE-4356-9C39-DDB96F6311CE',
        device_imei: '',
        device_mac: '02:00:00:00:00:00',
        device_odin: '2f5672cb76691b989bbd2022a5349939a2d7b952',
        device_open_id: 'e50fae88af5dda394c9d971b60ee9eb6959debab',
        device_secure_id: 'D33641F6-5C93-4514-90CC-B0896AFD79BE',
        devicebrand: 'iOS',
        devicemodel: 'iPhone',
        ipaddress: '',
        latitude: '0.000',
        locale: 'en-CN',
        longitude: '0.000',
        network: 'SKOUT',
        osversion: '10.3.2',
        param0: username,
        param1: password,
        sessionId: localStorage.getItem('sessionId'),
        signature: 'f296134bb67f44e20647230ff048927bb80fbfc976c4527914908a0291d97389',
        ui: 'iPhone SKOUT+ 4.26.0',
        version: 52
    };
    let config = {
        method: 'POST',
        url: URLS.IOS_LOGIN,
        headers: {
            _protocol: 'https://i'
        },
        data: userInfo,
        transformResponse: window.TRANSFORM_RESPONSE_XML,
    };
    return window.FETCH(config)
}

let getMeInfoUrlConfig = {
    url: URLS.IOS_ME_INFO,
    headers: {
        session_id: null
    },
    params: {
        ...window.API_INFO
    },
    transformResponse: window.TRANSFORM_RESPONSE_TEXT,
};
window.USER_INFO = JSON.parse(localStorage.getItem('userInfo'));
window.FETCH(getMeInfoUrlConfig).then(function (response) {
    window.EVENT.emit('loginSuccess',{
        sessionId:localStorage.getItem('sessionId'),
        userId:localStorage.getItem('userId'),
    });
    window.USER_INFO = JSON.parse(response.data);
    console.log.apply(console,[JSON.parse(response.data)]);
    localStorage.setItem('userInfo',response.data);
}).catch(function (error) {
    if (error.response && error.response.status === 403) {
        login({username:'',password:''})
            .then(function (res) {
                console.log.apply(console, ['登录数据', res]);
                let obj = res.data.GCLoginUserSignedNewUDIDResponse.return;
                if (obj['description'] === 'Please upgrade to the latest version available.') {//验证码
                    console.log.apply(console,['请验证']);
                } else if (obj['description'] === 'Invalid username or password, please try again') {
                    console.log.apply(console,['输入用户名或者密码错误!']);
                } else {
                    window.EVENT.emit('loginSuccess',{
                        sessionId:'',
                        userId:obj['id'],
                    });
                }
            });
        return;
    }
    alert('程序获取用户信息异常,请检查版本');
});

window.EVENT.addListener('loginSuccess',function ({sessionId,userId}) {
    localStorage.setItem('sessionId',sessionId);
    localStorage.setItem('userId',userId);
    ReactDOM.render(<Index/>, document.querySelector('#root'));
});
ReactDOM.render(<div style={{textAlign:'center'}}><CircularProgress size={50} /></div>, document.querySelector('#root'));