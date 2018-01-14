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
        width: 36,
        height: 36,
        borderRadius: 2,
        marginLeft:20,
    },
});

class Index extends React.Component {
    state = {
        open: false,
    };

    render() {
        const {classes} = this.props;

        return (

            <div style={{
                width:'100%',
                float:'left',
                margin:'8px 0'
            }}>
                <div style={{
                    width:70,
                    height:36,
                    float:'right'
                }}>
                    <img className={classes.userHandImg} src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1121475478,2545730346&fm=27&gp=0.jpg" alt="lake"/>
                </div>
                <div
                    style={{
                        borderRadius:4,
                        float:'right',
                        background:'#FFF',
                        minHeight:36,
                        position:'relative'
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: 14,
                            right: -6,
                            width: 0,
                            height: 0,
                            borderTop: '4px solid transparent',
                            borderLeft: '8px solid white',
                            borderBottom: '4px solid transparent',
                        }}
                    />
                    <div style={{
                        padding:'4px 10px',
                        fontSize:16,
                        maxWidth:400,
                    }}>
                        hello
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
