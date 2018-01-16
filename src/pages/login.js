import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import withRoot from '../withRoot';
import ChatList from '../component/chat/chat-list';
import ChatInput from './ChatInput';


const styles = theme => ({
    box: {
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowY: 'hidden'
    }
});

class Index extends React.Component {
    state = {
        open: false,
        inputValue: {__html: 'hello'},
        chatObj: undefined,
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.box}>

            </div>

        );
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
