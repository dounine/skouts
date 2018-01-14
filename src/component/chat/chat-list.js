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
        height: 300,
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
            this.state.chatItems = JSON.parse(items) || [];;
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
        window.FETCH(config).then(function (response) {
            console.log.apply(console, [response]);
            if (response.data) {
                $this.setState({
                    chatItems: response.data.elements
                }, function () {
                    localStorage.setItem('chatItems', JSON.stringify(response.data.elements));
                });
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
                // console.log.apply(console,['来',item]);
            }
            $this.setState({});
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
