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
    };

    render() {
        const {classes} = this.props;

        return (

            <div>
                <div style={{
                    height: 80,
                    // background: '#DFDFDF',
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
                                 src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1121475478,2545730346&fm=27&gp=0.jpg"/>
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
                                    // color:'#4C2600',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',

                                }}>艾佳生活交流群
                                </div>
                                <div style={{
                                    width: 76,
                                    marginLeft: 6,
                                    fontSize: 14,
                                    fontWeight: 600,
                                    color: '#B6B7B9',
                                    float: 'right',
                                    textAlign: 'center'
                                }}>12:12
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
                                    恩恩，亲你早点休息咯，哈哈哈哈哈哈
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

Index.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
