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
import ImageUtils from "../../constants/ImageUtils";

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
        data:this.props.data,
    };

    shouldComponentUpdate(nextProps,state) {
        if(nextProps.id===state){
            return false;
        }
        return true;
    }

    render() {
        const {classes,data,handImg} = this.props;

        return (

            <div style={{
                width:'100%',
                float:'left',
                // maxWidth:470,
                margin:'8px 0'
            }}>
                <div style={{
                    width:70,
                    height:36,
                    float:'left'
                }}>
                    <img className={classes.userHandImg} src={ImageUtils(handImg)} alt="lake"/>
                </div>
                <div
                    style={{
                        borderRadius:4,
                        float:'left',
                        background:'#FFF',
                        minHeight:36,
                        position:'relative'
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: 14,
                            left: -6,
                            width: 0,
                            height: 0,
                            borderTop: '4px solid transparent',
                            borderRight: '8px solid white',
                            borderBottom: '4px solid transparent',
                        }}
                    />
                    <div style={{
                        padding:'4px 10px',
                        fontSize:16,
                        maxWidth:400,
                    }}>
                        {data.text}
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
