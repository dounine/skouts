import React from 'react';

class ClearIcon extends React.Component {
    render() {
        const fontSize = this.props.fontSize || 16;
        return (
            <i style={{fontSize:fontSize, color:'#767676'}} className="iconfont icon-emos"></i>
        );
    }
}

export default ClearIcon;