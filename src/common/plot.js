/**
 * Created by zeche on 16/06/24.
 */

import React, {Component} from 'react';
import {Tooltip, Popover, OverlayTrigger} from 'react-bootstrap';
import {cicadaTracePopoverStyle} from '../cicada-style';

/**
 * @param location
 */
var SpanLabel = React.createClass({
    getInitialState: function() {
        let labelStyle = {
            left: parseInt((this.props.location - 1) || 0) * 3 + "%",
            position: "relative",
            width: "75%",
            overflow: "hidden",
            background: "#FAEBD7",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
        };

        let hintBox = (
            <Popover title={"App: " + this.props.data.appName} style={cicadaTracePopoverStyle}>
                <strong>Service:</strong> {this.props.data.serviceName}
                <br />
                <strong>Method:</strong> {this.props.data.methodName}
            </Popover>
        );

        return {labelStyle: labelStyle, hintBox: hintBox};
    },

    render() {
        return (
            <OverlayTrigger trigger="click" placement="bottom" overlay={this.state.hintBox}>
                <div style={this.state.labelStyle}>
                    {this.props.children}
                </div>
            </OverlayTrigger>
        )
    }
});


var AnnoLabel = React.createClass({
    getInitialState: function() {
        let labelStyle = {
            position: "relative",
            float: "right",
            width: "75%",
            background: "#7FFFD4",
            overflow: "hidden",
            textAlign: "right",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
        };

        let hintBox = (
            <Popover title={"Key: " + this.props.data.key} style={cicadaTracePopoverStyle}>
                <strong>Reason: </strong>{this.props.data.value}
            </Popover>
        );

        return {labelStyle: labelStyle, hintBox: hintBox};
    },

    render() {
        return (
            <OverlayTrigger trigger="click" placement="bottom" overlay={this.state.hintBox}>
                <div style={this.state.labelStyle}>
                    {this.props.children}
                </div>
            </OverlayTrigger>
        )
    }
});

/**
 * @param length
 * @param display
 */
var ServerRect = React.createClass({
    getInitialState: function() {
        let style = {
            width: this.props.length || "100%",
            display: this.props.display || "block",
            position: "relative",
            background: "#8FBC8F",
        };

        return {style: style}
    },
    render: function() {
        return (
            <div style={this.state.style}>
                {this.props.children}
            </div>);
    }
});

/**
 * @param length
 * @param display
 */
var ClientRect = React.createClass({
    getInitialState: function() {
        let clientRectStyle = {
            width: this.props.length || "100%",
            display: this.props.display || "block",
            position: "relative",
            background: "#AFEEEE",
            textAlign: "right"
        };
        return {style: clientRectStyle};
    },
    render: function() {
        return (
            <div style={this.state.style}>
                {this.props.children}
            </div>);
    }
});

/**
 * @param length
 */
var EventRect = React.createClass({
    getInitialState: function() {
        let eventRectStyle = {
            width: this.props.length || "100%",
            position: "relative",
            background: "#48D1CC"
        };
        return {style: eventRectStyle};
    },
    render: function() {
        return (
            <div style={this.state.style}>
                {this.props.children}
            </div>);
    }
});

/**
 * @param length
 */
var ErrorRect = React.createClass({
    getInitialState: function() {
        let errorRectStyle = {
            width: this.props.length || "100%",
            position: "relative",
            background: "#F08080"
        };
        return {style: errorRectStyle};
    },
    render: function() {
        return (
            <div style={this.state.style}>
                {this.props.children}
            </div>
        );
    }
});

export { SpanLabel, AnnoLabel, ServerRect, ClientRect, EventRect, ErrorRect };
