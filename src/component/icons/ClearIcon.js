import React from 'react';

class ClearIcon extends React.Component {
    render() {
        const fontSize = this.props.fontSize || 16;
        return (
            <i style={{fontSize:fontSize}} className="iconfont icon-clear"></i>
        );
    }
}

export default ClearIcon;