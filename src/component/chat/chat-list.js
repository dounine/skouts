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
import Input from 'material-ui/Input';
import ChatItem from './chat-item';

const styles = theme => ({
    box: {
        // width: '100%',
        // height: '100%',
        // display: 'flex',
    },
    search:{
        width:256,
        margin:'0 auto'
    },
    userHandImg:{
        width:50,
        height:50,
        borderRadius:2,
    },
    list:{
        marginTop:10,
        overflowY:'scroll',
        height:300,
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
                <div className={classes.search}>
                    <Input
                        placeholder="search"
                        // className={classes.input}
                        inputProps={{
                            'aria-label': 'search',
                        }}
                    />
                </div>
                <div className={classes.list}>
                    <ChatItem/>
                    <ChatItem/>
                    <ChatItem/>
                    <ChatItem/>
                    <ChatItem/>
                    <ChatItem/>
                    <ChatItem/>
                    <ChatItem/>
                    <ChatItem/>
                </div>
            </div>

        );
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
