/**
 * Created by zeche on 16/06/23.
 */

import React, {Component} from 'react';
import {Pager, PageItem} from 'react-bootstrap';

var CicadaNolimitPageFooter = React.createClass({
    getInitialState() {
        this.page = 0;
        return {page: 0};
    },

    _handleClick(eventType) {
        switch (eventType) {
            case 'prev':
                if (this.page <= 0) {
                    alert("没有之前的数据!");
                    return;
                }
                this.page -= 1;
                break;

            case 'next':
                this.page += 1;
                break;

            default:
                return
        }

        this.props.handleClickCallback({page: this.page});
        this.setState({page: this.page});
    },

    componentWillReceiveProps: function(nextProps) {
        if (nextProps.resetPage) {
            this.page = 0;
            this.setState({page: 0});
        }
    },

    render() {
        return (
            <div>
                <Pager>
                    <PageItem previous disabled={this.state.page <= 0}
                              onClick={this._handleClick.bind(this, "prev")}> &larr; prev </PageItem>
                    <PageItem next onClick={this._handleClick.bind(this, "next")}> next &rarr;</PageItem>
                </Pager>
            </div>
        );
    }
});

export default CicadaNolimitPageFooter;