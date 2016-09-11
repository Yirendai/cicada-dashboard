/**
 * Created by zeche on 16/06/23.
 */

import React, {Component} from 'react';
import {Pagination} from 'react-bootstrap';

var CicadaPageFooter = React.createClass({
    getInitialState() {
        this.maxButton = 5;
        return {activePage: 1};
    },

    _handleSelect(eventKey) {
        this.props.onPageClick({page: eventKey - 1});
        this.setState({
            activePage: eventKey
        });
    },

    componentWillReceiveProps: function(nextProps) {
        if (nextProps.resetPage) {
            this.setState({activePage: 1});
        }
    },

    render() {
        return (
            <div>
                <Pagination
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    items={this.props.pageCount}
                    maxButtons={this.maxButton}
                    activePage={this.state.activePage}
                    onSelect={this._handleSelect}/>
            </div>
        );
    }
});

export default CicadaPageFooter;