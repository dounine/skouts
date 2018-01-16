import React from 'react';

import withRoot from "../withRoot";
import URLS from './Urls';
import {withStyles} from "material-ui/styles/index";

const styles = theme => ({});
class UserUtils extends React.Component {

    static login({username, password}) {
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

}

export default withRoot(withStyles(styles)(UserUtils));
