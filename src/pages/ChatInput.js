import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import withRoot from '../withRoot';
import ChatList from '../component/chat/chat-list';
import TextField from 'material-ui/TextField';
import EmosIcon from '../component/icons/EmosIcon';
import PhotoIcon from '../component/icons/PhotoIcon';
import TranslateIcon from '../component/icons/TranslateIcon';
import VoiceSpeakIcon from '../component/icons/VoiceSpeakIcon';
import ChatThey from '../component/chat/chat-they';
import ChatMine from '../component/chat/chat-mine';
import URLS from '../constants/Urls';


const styles = theme => ({
    chatContent: {
        flex: 1,
        background: '#F3F3F3'
    },
    userBar: {
        display: 'flex',
        width: '100%',
        height: 48,
        alignItems: 'center',
        textIndent: 20,
        fontSize: 16,
        fontWeight: 500,
        border: '1px solid #E2E2E2',
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
    },
    chatMessages: {
        // height:'60%',
        // background:'#9cf'
    },
    chatInput: {
        display: 'flex',
        flexDirection: 'column'
        // height:'40%',
        // background:'red'
    },
    chatBar: {
        border: '1px solid #E2E2E2',
        borderLeft: 0,
        borderRight: 0,
        borderBottom: 0,
        height: 50,
        paddingTop: 6,
    },
    inputText: {
        fontSize: 16,
        width: '96%',
        height: 100,
        overflowY: 'scroll',
        margin: '2%',
        background: '#F3F3F3',
        border: 0,
        outline: 'none',
        resize: 'none'
    }
});

class Index extends React.Component {
    state = {
        open: false,
        inputValue: {__html: 'hello'},
        chatObj: this.props.data,
        chatMessages: [],
    };

    componentDidMount() {
        let $this = this;
        window.EVENT.addListener('chatItemClick', function (chatObj) {
            $this.setState({
                chatObj
            }, function () {
                $this.renderMessages();
            });
            console.log.apply(console, [chatObj]);
        });
        // if(this.state.chatObj){
        //     $this.renderMessages();
        // }
    }

    inputHandleChange = prop => event => {
        var showPassword = event.target.value.length > 0;
        this.setState({
            [prop]: event.target.value,
        });
    };

    scrollBottom = () =>{
        let div = document.getElementById('chatContainer');
        div.scrollTop = div.scrollHeight;
    };

    renderMessages = () => {
        let $this = this;
        let config = {
            url: URLS.IOS_CHATS_FOR_NEWS.format({
                userId: $this.state.chatObj.user.id,
                limit: 20,
                // offset:0
            }),
            headers: {
                session_id: null
            }
        };
        var messages = localStorage.getItem('msg-' + $this.state.chatObj.user.id);
        $this.setState({
            chatMessages: JSON.parse(messages)
        }, function () {
            $this.scrollBottom();
        });
        if (messages) return;
        window.FETCH(config).then(function (response) {
            console.log.apply(console, ['聊天消息查询完成', response.data]);
            //消息阅读
            if (messages !== JSON.stringify(response.data.elements)) {
                localStorage.setItem('msg-' + $this.state.chatObj.user.id, JSON.stringify(response.data.elements));
                $this.setState({
                    chatMessages: response.data.elements
                },function () {
                    $this.scrollBottom();
                });
            }
        }).catch(function (err) {
            console.log.apply(console, [err]);
        });
    };

    render() {
        const {classes} = this.props;
        const $this = this;

        if (!this.state.chatObj) {
            return null;
        }

        const asTags = function* () {
            if (!($this.state.chatMessages && $this.state.chatMessages.length > 0)) {
                return null;
            }
            for (const data of $this.state.chatMessages) {
                if(data.to===window.USER_INFO.id){
                    yield <ChatThey data={data} handImg={$this.state.chatObj.user.image_url} key={data.id}/>;
                }else{
                    yield <ChatMine data={data} handImg={window.USER_INFO.image_url} key={data.id}/>;
                }
            }
        };

        return (
            <div className={classes.chatContent}>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                }}>
                    <div className={classes.chatMessages}>
                        <div className={classes.userBar}>
                            {this.state.chatObj.user.name}
                        </div>
                        <div id={"chatContainer"} style={{
                            height: 300,
                            overflowY: 'auto'
                        }}>
                            {[...asTags()]}
                        </div>
                    </div>
                    <div className={classes.chatInput}>
                        <div className={classes.chatBar}>
                            <div style={{
                                float: 'left',
                                marginLeft: 20,
                            }}>
                                <EmosIcon fontSize={24}/>
                            </div>
                            <div style={{
                                float: 'left',
                                marginLeft: 20,
                            }}>
                                <PhotoIcon fontSize={24}/>
                            </div>
                            <div style={{
                                float: 'right',
                                marginRight: 20,
                            }}>
                                <TranslateIcon fontSize={24}/>
                            </div>
                            <div style={{
                                float: 'right',
                                marginRight: 20,
                            }}>
                                <VoiceSpeakIcon fontSize={24}/>
                            </div>
                        </div>
                        <div>
                            <div contentEditable={true} onChange={this.inputHandleChange('inputValue')} autoFocus={true}
                                 className={classes.inputText} dangerouslySetInnerHTML={this.state.inputValue}>
                                {/*<img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1121475478,2545730346&fm=27&gp=0.jpg" alt="lake"/>*/}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
