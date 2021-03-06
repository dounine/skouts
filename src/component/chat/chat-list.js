import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';
import {parseString} from 'react-native-xml2js';
import withRoot from '../../withRoot';
import IconButton from 'material-ui/IconButton';
import Input, {InputAdornment} from 'material-ui/Input';
import ClearIcon from '../icons/ClearIcon';
import ChatItem from './chat-item';
import URLS from '../../constants/Urls';


const styles = theme => ({
    box: {
        // width: '100%',
        // height: '100%',
        // display: 'flex',
    },
    search: {
        width: 256,
        margin: '0 auto'
    },
    userHandImg: {
        width: 50,
        height: 50,
        borderRadius: 2,
    },
    list: {
        marginTop: 10,
        overflowY: 'scroll',
        height: document.body.clientHeight,
    }
});

class Index extends React.Component {
    state = {
        open: false,
        search: '',
        showPassword: false,
        chatItems: [],
    };

    constructor() {
        super();
        this.source = window.AXIOS.CancelToken.source();
        var items = localStorage.getItem('chatItems');
        if(items){//读取缓存聊天列表
            let objs = JSON.parse(items);
            let clickItemId = localStorage.getItem('clickItemId');
            if(clickItemId){
                for(let obj of objs){
                    if((obj.user.id+"")===clickItemId){
                        obj.active = true;
                        setTimeout(function () {
                            window.EVENT.emit('chatItemClick',obj)
                        });
                        break;
                    }
                }
            }else{
                objs[0].active = true;
                setTimeout(function () {
                    localStorage.setItem('clickItemId',objs[0].user.id);
                    window.EVENT.emit('chatItemClick',objs[0])
                })
            }
            this.state.chatItems = objs || [];;
        }
    }

    componentDidMount() {
        let $this = this;
        let config = {
            method: 'GET',
            url: URLS.IOS_CHATS.format({
                limit: 20,
                since_message: 0
            }),
            params: {
                ...window.API_INFO,
            },
            headers: {
                session_id: null,
            },
            transformResponse: window.TRANSFORM_RESPONSE_JSON,
            cancelToken: $this.source.token,
        };
        let featureConfig = {
            url: URLS.IOS_FEATURE_ME,
            headers: {
                session_id: null
            },
            params: {
                ...window.API_INFO,
            }
        };
        window.FETCH(featureConfig).then(function (response) {
            console.log.apply(console,['信息',response]);
        }).catch(function (err) {
            // console.log.apply(console,[err]);
        });
        let cconfig = {
            method: 'POST',
            url: URLS.IOS_MUTUAL_USERS,
            headers: {
                // session_id:SESSION_ID,
                _protocol: 'http://i',
            },
            data: {
                ...window.API_INFO,
                gender: 0,
                includeMeetMeUsers: true,
                interestedIn: 0,
                noOfElements: 18,
                searchEthnicityMulti: '',
                searchHasPicture: false,
                searchLevel: 2,
                searchLocationString: '',
                searchMaxAge: 30,
                searchMinAge: 18,
                searchOnlineStatus: false,
                sessionId: localStorage.getItem('sessionId'),
                startOffset: 0,
            },
            transformResponse: [function (data) {
                let convertData = null;
                parseString(data, function (err, result) {
                    convertData = result;
                });
                let getData = setInterval(function () {
                    if (convertData !== undefined) {
                        clearInterval(getData);
                    }
                }, 1);
                return convertData;
            }],
        };
        window.FETCH(cconfig).then(function (response) {
            console.log.apply(console,['搜索信息',response]);
        }).catch(function (err) {
            // console.log.apply(console,[err]);
        });
        window.FETCH(config).then(function (response) {
            if (response.data) {
                if(JSON.stringify(response.data.elements)!==localStorage.getItem('chatItems')){
                    $this.setState({
                        chatItems: response.data.elements
                    }, function () {
                        localStorage.setItem('chatItems', JSON.stringify(response.data.elements));
                    });
                }

            }
        }).catch(function (err) {
            // console.log.apply(console,[err]);
        });

        window.EVENT.addListener('chatItemClick', function (chatObj) {
            for(var item of $this.state.chatItems){
                if(chatObj.user.id===item.user.id){
                    item.active = true;
                }else if(item.active!==undefined){
                    item.active = false;
                }
            }
            $this.setState({},function () {
                // $this.renderMessages();
            });
            // $this.setState({
            //     chatObj
            // },function () {
            //     $this.renderMessages();
            // });
            console.log.apply(console, [chatObj]);
        });
    }

    handleChange = prop => event => {
        var showPassword = event.target.value.length > 0;
        this.setState({
            [prop]: event.target.value,
            showPassword,
        });
    };

    handleClickShowPasssword = () => {
        this.setState({
            search: '',
            showPassword: false
        });
    };

    render() {
        const {classes} = this.props;
        const chatItems = this.state.chatItems;
        const asTags = function* () {
            if (!(chatItems && chatItems.length > 0)) {
                return null;
            }
            for (const data of chatItems) {
                yield <ChatItem data={data} handImg={data.user.image_url} key={data.user.id}/>;
            }
        };

        return (
            <div className={classes.box}>
                <div className={classes.search}>
                    <Input
                        placeholder="search"
                        inputProps={{
                            'aria-label': 'search',
                        }}
                        value={this.state.search}
                        onChange={this.handleChange('search')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={this.handleClickShowPasssword}
                                    onMouseDown={this.handleMouseDownPassword}
                                >
                                    {this.state.showPassword ? <ClearIcon/> : null}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </div>
                <div className={classes.list}>
                    {[...asTags()]}
                </div>
            </div>

        );
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
