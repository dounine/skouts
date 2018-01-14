import {parseString} from 'react-native-xml2js';

//config {createNewKey:false,append:false}
Date.prototype.timeBetween = function() {
    let time = this;
    let date3 = new Date().getTime() - new Date(time).getTime();   //时间差的毫秒数
    //计算出相差天数
    let days = Math.floor(date3 / (24 * 3600 * 1000))
    //计算出小时数
    let leave1 = date3 % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
    let hours = Math.floor(leave1 / (3600 * 1000))
    //计算相差分钟数
    let leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
    let minutes = Math.floor(leave2 / (60 * 1000))
    //计算相差秒数
    let leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
    let seconds = Math.round(leave3 / 1000)
    if (days > 0) {
        return ['d',days];
    } else if (hours > 0) {
        return ['h',hours];
    } else if (minutes > 0) {
        return ['m',minutes];
    } else if (seconds >= 0) {
        return ['s',seconds];
    } else {
        return ['l',];
    }
}

Date.prototype.pattern = function (fmt) {
    var date = this;
    date = date === undefined ? new Date() : date;
    date = typeof date === 'number' ? new Date(date) : date;
    fmt = fmt || 'yyyy-MM-dd HH:mm:ss';
    var obj =
        {
            'y': date.getFullYear(), // 年份，注意必须用getFullYear
            'M': date.getMonth() + 1, // 月份，注意是从0-11
            'd': date.getDate(), // 日期
            'q': Math.floor((date.getMonth() + 3) / 3), // 季度
            'w': date.getDay(), // 星期，注意是0-6
            'H': date.getHours(), // 24小时制
            'h': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 12小时制
            'm': date.getMinutes(), // 分钟
            's': date.getSeconds(), // 秒
            'S': date.getMilliseconds() // 毫秒
        };
    var week = ['天', '一', '二', '三', '四', '五', '六'];
    for (var i in obj) {
        fmt = fmt.replace(new RegExp(i + '+', 'g'), function (m) {
            var val = obj[i] + '';
            if (i === 'w') return (m.length > 2 ? '星期' : '周') + week[val];
            for (var j = 0, len = val.length; j < m.length - len; j++) val = '0' + val;
            return m.length === 1 ? val : val.substring(val.length - m.length);
        });
    }
    return fmt;
}
Array.prototype.updateAttr = function (key, value, newKey, newValue, config) {
    config = config || {};
    config.append = config.append || false;
    config.createNewKey = config.createNewKey || false;
    let isFind = 0;
    for (let i = 0, len = this.length; i < len; i++) {
        let t = this[i],
            isKeyAttr = false,
            lastObj = null,
            keyArr = key.split('.');
        keyArr.forEach(function (_key) {
            if ((typeof t[_key]) === 'object') {
                t = t[_key];
            } else {
                isKeyAttr = (_key in t);
                lastObj = t[_key];
            }
        });
        if (!isKeyAttr) {
            throw Error(key + ' 原key找不到');
        }
        if (lastObj !== value) {
            continue;
        }
        let b = this[i],
            isNKeyAttr = false,
            lastNObj = null,
            newKeyArr = newKey.split('.');
        newKeyArr.forEach(function (_nKey) {
            if ((typeof b[_nKey]) === 'object') {
                b = b[_nKey];
            } else {
                isNKeyAttr = (_nKey in b);
                lastNObj = _nKey;
            }
        });
        if (!isNKeyAttr) {
            if (config.createNewKey === false) {
                throw Error(newKey + ' 新key找不到');
            }
        }
        if (config.append) {//对数据进行新增操作,数字相加,字符串拼接
            if ((typeof b[lastNObj]) === 'string') {
                b[lastNObj] = (b[lastNObj] + newValue);
            } else if ((typeof b[lastNObj]) === 'number') {
                b[lastNObj] = (b[lastNObj] + Number(newValue));
            } else {
                b[lastNObj] = newValue;
            }
        } else {
            b[lastNObj] = newValue;
        }
        isFind++;
    }
    return isFind;
};
Array.prototype.findByAttr = function (key, value, returnKey, config) {
    let isFind = [];
    for (let i = 0, len = this.length; i < len; i++) {
        let t = this[i],
            isKeyAttr = false,
            lastObj = null,
            keyArr = key.split('.');
        keyArr.forEach(function (_key) {
            if ((typeof t[_key]) === 'object') {
                t = t[_key];
            } else {
                isKeyAttr = (_key in t);
                lastObj = t[_key];
            }
        });
        if (!isKeyAttr) {
            throw Error(key + ' 原key找不到');
        }
        if (lastObj !== value) {
            continue;
        }
        let b = this[i],
            isNKeyAttr = false,
            lastNObj = null,
            newKeyArr = returnKey.split('.');
        newKeyArr.forEach(function (_nKey) {
            if ((typeof b[_nKey]) === 'object') {
                b = b[_nKey];
            } else {
                isNKeyAttr = (_nKey in b);
                lastNObj = _nKey;
            }
        });
        if (!isNKeyAttr) {
            if (!config || (config && (config.createNewKey && config.createNewKey === false ))) {
                throw Error(returnKey + ' 新key找不到');
            }
        }
        isFind.push(b[lastNObj]);
    }
    return isFind;
};
String.prototype.symbolReturnClear = function (replaceSymbol) {
    return this.replace(/[\r\n]/g, replaceSymbol || " ");
};
String.prototype.format = function (opts) {//use 'my name is ${name}'.format({name:'lake'})
    var data = Array.prototype.slice.call(arguments, 0),
        toString = Object.prototype.toString;
    if (data.length) {
        data = data.length === 1 ?
            (opts !== null && (/\[object Array\]|\[object Object\]/.test(toString.call(opts))) ? opts : data) : data;
        return this.replace(/\$\{(.+?)\}/g, function (match, key) {
            var replacer = data[key];
            // chrome 下 typeof /a/ == 'function'

            if ('[object Function]' === toString.call(replacer)) {
                replacer = replacer(key);
            }
            return ('undefined' === typeof replacer ? '' : replacer);
        });
    }
    return this;
}
String.prototype.xml2js = function (callback) {
    // parseString(this,callback);
    return parseString(this, callback);
};
String.prototype.emojiReplace = function () {
    if (this) {
        return this.replace(/\(Y\)/g, "👍")
            .replace(/\*inlove\*/g, "😍")
            .replace(/:\$/g, "☺️")
            .replace(/\*blowkiss\*/g, "😘")
            .replace(/\*unamused\*/g, "😁")
            .replace(/:@/g, "😡")
            .replace(/:\*/g, "😚");
    }
    return ""
}