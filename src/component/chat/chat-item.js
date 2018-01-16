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
import Input from 'material-ui/Input';
import withRoot from '../../withRoot';
import TimeUtils from '../../constants/TimeUtils';
import ImageUtils,{TYPES} from '../../constants/ImageUtils';

const styles = theme => ({
    userHandImg: {
        width: 50,
        height: 50,
        borderRadius: 2,
    },
});

class Index extends React.Component {
    state = {
        open: false,
        lastMsgId:this.props.data.last_message.id,
        // active:false,
    };

    getFriendData = (dt) =>{
        let time = new Date(dt);
        let yesdayTime = (time.timeBetween()[0] === 'd' && time.timeBetween()[1] === 1);
        let beforeYesdayTime = (time.timeBetween()[0] === 'd' && time.timeBetween()[1] > 1 && time.timeBetween()[1] < 7);
        let isHMS = time.timeBetween()[0] === 'h' || time.timeBetween()[0] === 'm' || time.timeBetween()[0] === 's';
        let ddays = null;
        if (beforeYesdayTime) {
            let ds = ['日', '一', '二', '三', '四', '五', '六'];
            ddays = '星期' + ds[time.getDay()];
        }
        let friendsDay = yesdayTime ? '昨天' : (ddays ? ddays : (isHMS ? time.pattern('HH:mm') : time.pattern('MM-dd')));
        return friendsDay;
    };

    chatItemClick = () =>{
        window.EVENT.emit('chatItemClick',this.props.data);
    };

    shouldComponentUpdate(nextProps, state) {
        if(nextProps.data.last_message.id!==state.lastMsgId){
            return true;
        }
        if(nextProps.data.active!==undefined){
            return true;
        }
        console.log.apply(console,['不修改']);
        return false;
    }


    render() {
        const {classes,data} = this.props;
        let friendsDay = this.getFriendData(data.last_message.dt);

        return (

            <div
                onClick={this.chatItemClick}
            >
                <div style={{
                    height: 80,
                    background:data.active?'#DFDFDF':'#F9F9F9'
                }}>
                    <div style={{
                        paddingTop: 15,
                    }}>
                        <div style={{
                            float: 'left',
                            width: 70,
                            textAlign: 'center',

                        }}>
                            <img className={classes.userHandImg}
                                 src={ImageUtils(data.user.image_url,TYPES.tn65)}/>
                        </div>
                        <div>
                            <div
                                style={{
                                    marginTop: 1,
                                    height: 28,
                                }}
                            >
                                <div style={{
                                    width: 100,
                                    fontWeight: 500,
                                    fontSize: 14,
                                    float: 'left',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',

                                }}>{data.user.name}
                                </div>
                                <div style={{
                                    width: 76,
                                    marginLeft: 6,
                                    fontSize: 14,
                                    fontWeight: 600,
                                    color: '#B6B7B9',
                                    float: 'right',
                                    textAlign: 'center'
                                }}>{friendsDay}
                                </div>
                            </div>
                            <div>
                                <div
                                    style={{
                                        float: 'left',
                                        width: 160,
                                        fontSize: 13,
                                        color: '#868181',
                                        fontWeight: 500,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {data.last_message.text}
                                </div>
                                <i style={{
                                    float: 'left',
                                    width: 18,
                                    height: 18,
                                    fontSize: 18,
                                    padding: 1,
                                    color: '#bababa',
                                }} className="iconfont icon-voice"/>
                            </div>
                        </div>
                    </div>

                </div>
                <div style={{height: 1, width: 255, marginLeft: 10, background: '#E8E8E8'}}/>
            </div>
        );
    }
}

// Index.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

export default withRoot(withStyles(styles)(Index));
