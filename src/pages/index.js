import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import withRoot from '../withRoot';
import ChatList from '../component/chat/chat-list';

const styles = theme => ({
    box: {
        width: '100%',
        height: '100%',
        display: 'flex',
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
        borderRadius:2,
        width: 44,
        height: 44,
    },
    funIcon:{
        textAlign:'center',
        marginBottom:20,
    },
    chatContent:{
        flex:1,
        background:'#F3F3F3'
    }
});

class Index extends React.Component {
    state = {
        open: false,
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
                        <ChatList />
                    </div>
                </div>
                <div className={classes.chatContent}>
                    chat contant
                </div>
            </div>

        );
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
