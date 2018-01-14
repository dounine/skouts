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

const styles = theme => ({
    box: {
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowY:'hidden'
    },
    nav: {
        display: 'flex',
        width: 350,
        height: '100%',
        background: '#262626',
    },
    navBar: {
        width: 70,
        // background: '#2A2B45',
    },
    navList: {
        flex: 1,
        background: '#F9F9F9',
    },
    menuIcon: {//菜单按钮icon
        borderRadius: 9,
        fontSize: 12,
        width: 18,
        height: 18,
        padding: 1,
    },
    navHand: {//头像
        marginTop: 30,
        height: 84,
        textAlign: 'center'
    },
    handImg: {
        borderRadius: 2,
        width: 44,
        height: 44,
    },
    funIcon: {
        textAlign: 'center',
        marginBottom: 20,
    },
    chatContent: {
        flex: 1,
        background: '#F3F3F3'
    },


    userBar: {
        display: 'flex',
        width: '100%',
        height: 48,
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
        display:'flex',
        flexDirection:'column'
        // height:'40%',
        // background:'red'
    },
    chatBar:{
        border:'1px solid #E2E2E2',
        borderLeft:0,
        borderRight:0,
        borderBottom:0,
        height:50,
        paddingTop:6,
    },
    inputText:{
        fontSize:16,
        width:'96%',
        height:'96%',
        margin:'2%',
        background:'#F3F3F3',
        border:0,
        outline:'none',
        resize:'none'
    }
});

class Index extends React.Component {
    state = {
        open: false,
        inputValue:''
    };

    inputHandleChange = prop => event => {
        var showPassword = event.target.value.length>0;
        this.setState({
            [prop]: event.target.value,
        });
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.box}>
                <div className={classes.nav}>
                    <div className={classes.navBar}>
                        <div
                            style={{
                                display: 'flex',
                                cursor: 'pointer',
                            }}>
                            <div style={{flex: 1, marginLeft: 8}}>
                                <i style={{
                                    background: '#FC625D',
                                    color: '#292929',
                                }} className={"iconfont icon-menu-close " + classes.menuIcon}/>
                            </div>
                            <div style={{flex: 1}}>
                                <i style={{
                                    background: '#FDBE41',
                                    color: '#292929',
                                }} className={"iconfont icon-menu-min " + classes.menuIcon}/>
                            </div>
                            <div style={{flex: 1}}>
                                <i style={{
                                    background: '#34C84A',
                                    color: '#292929',
                                }} className={"iconfont icon-menu-max " + classes.menuIcon}/>
                            </div>
                        </div>
                        <div className={classes.navHand}>
                            <img
                                className={classes.handImg}
                                src={"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1121475478,2545730346&fm=27&gp=0.jpg"}
                            />
                        </div>
                        <div className={classes.funIcon}>
                            <i style={{
                                fontSize: 36,
                                padding: 1,
                                color: '#1FB922',
                            }} className="iconfont icon-chat"/>
                        </div>
                        <div className={classes.funIcon}>
                            <i style={{
                                fontSize: 36,
                                padding: 1,
                                color: '#808080',
                            }} className="iconfont icon-friend"/>
                        </div>
                        <div className={classes.funIcon}>
                            <i style={{
                                fontSize: 36,
                                padding: 1,
                                color: '#808080',
                            }} className="iconfont icon-funs"/>
                        </div>
                    </div>
                    <div className={classes.navList}>
                        <ChatList/>
                    </div>
                </div>
                <div className={classes.chatContent}>

                    <div style={{
                        display: 'flex',
                        flexDirection:'column',
                        height:'100%'
                    }}>
                        <div className={classes.chatMessages}>
                            <div className={classes.userBar}>
                                黄焕来
                            </div>
                            <div style={{
                                height:300,
                                overflowY:'scroll'
                            }}>
                                <div>hello</div>
                                <div>hello</div>
                                <div>hello</div>
                                <div>hello</div>
                                <div>hello</div>
                                <div>hello</div>
                                <div>hello</div>
                                <div>hello</div>
                                <div>hello</div>
                                <div>hello</div>
                                <div>hello</div>
                                <div>hello</div>
                                <div>hello</div>
                            </div>
                        </div>
                        <div className={classes.chatInput}>
                            <div className={classes.chatBar}>
                                <div style={{
                                    float:'left',
                                    marginLeft:20,
                                }}>
                                    <EmosIcon fontSize={24}/>
                                </div>
                                <div style={{
                                    float:'left',
                                    marginLeft:20,
                                }}>
                                    <PhotoIcon fontSize={24}/>
                                </div>
                                <div style={{
                                    float:'right',
                                    marginRight:20,
                                }}>
                                    <TranslateIcon fontSize={24}/>
                                </div>
                                <div style={{
                                    float:'right',
                                    marginRight:20,
                                }}>
                                    <VoiceSpeakIcon fontSize={24}/>
                                </div>
                            </div>
                            <div style={{
                                // flex:1,
                                // flex:1,
                                // background:'red'
                            }}>
                                <textarea onChange={this.inputHandleChange('inputValue')} autoFocus={true} className={classes.inputText} cols="30" rows="10" value={this.state.inputValue}/>
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
