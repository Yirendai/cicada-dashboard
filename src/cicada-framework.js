/**
 * Created by Zecheng on 16/06/15.
 */

import React, {Component} from 'react';
import CicadaNavbar from './common/cicada-navbar';

var CicadaFramework = React.createClass({
    render() {
        return (
            <div>
                <CicadaNavbar />
                {this.props.children}
            </div>
        );
    }
});

export default CicadaFramework;
