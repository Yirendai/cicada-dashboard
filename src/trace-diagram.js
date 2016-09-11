/**
 * Created by Zecheng on 16/6/22.
 */

import $ from 'jquery';
import React, {Component} from 'react';
import {Table} from 'react-bootstrap';

import * as config from './config';
import {cicadaTableStyle} from './cicada-style';
import {SpanLabel, AnnoLabel, ServerRect, ClientRect, EventRect, ErrorRect} from './common/plot';

const tableStyle = {width: "100%", tableLayout: "fixed"}

var CicadaTraceAnnoUnit = React.createClass({
    render: function () {
        let anno = this.props.data;
        let width = Math.round(anno.duration * 100 / this.props.total) + "%";
        let timeRect;
        if (anno.type === "EVENT") {
            timeRect = <EventRect length={width}>{anno.duration}</EventRect>
        } else {
            timeRect = <ErrorRect length={width}>{anno.duration}</ErrorRect>
        };

        let labelText = anno.key + "  " + anno.value;

        return (
            <tr>
                <td width="55%">
                    <AnnoLabel data={anno}>
                        {labelText}
                    </AnnoLabel>
                </td>
                <td width="10%">{anno.type}</td>
                <td width="35%">{timeRect}</td>
            </tr>
        );
    }
});

var CicadaTraceSpanUnit = React.createClass({
    render: function () {
        let totalDuration = this.props.total;
        let span = this.props.data;
        let level = span.id.split(".").length;
        let labelText = span.appName + "  " + span.serviceName + "  " + span.methodName;
        let ratioClient = Math.round(span.durationClient * 100 / totalDuration) + '%';
        let ratioServer = Math.round(span.durationServer * 100 / totalDuration) + '%';

        return (
            <tr>
                <td width="55%"><SpanLabel location={level} data={this.props.data}>{labelText}</SpanLabel></td>
                <td width="10%"></td>
                <td width="35%">
                    <ClientRect
                        display={parseInt(span.durationClient) === 0 ? "none" : "block"}
                        length={ratioClient}>
                        {span.durationClient}
                    </ClientRect>
                    <ServerRect length={ratioServer}>{span.durationServer}</ServerRect>
                </td>
            </tr>
        );
    }
});

var CicadaTraceDiagramTable = React.createClass({

    render: function () {
        let rows = [];
        let contents = this.props.contents;
        if (contents.length != 0) {
            let totalDuration = contents[0].durationClient === 0 ? contents[0].durationServer : contents[0].durationClient;
            contents.map(function (span) {
                rows.push(<CicadaTraceSpanUnit total={totalDuration} data={span} key={span.id} />);

                span.annotations.map(function(anno) {
                    rows.push(<CicadaTraceAnnoUnit total={totalDuration} data={anno}/>);
                })
            });
        }

        return (
            <Table style={tableStyle}>
                <thead>
                <tr > 
                    <th width="55%">#</th>
                    <th width="10%">事件类型</th>
                    <th width="35%">耗费时长</th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </Table>
        );
    }
});

{/* 查看trace调用链图 */}
var CicadaTraceDiagramComponent = React.createClass({
    getInitialState: function () {
        this.url = config.server + config.WEB_URL_PATH + "/entities/traces/" + this.props.params.traceId;
        return {contents: []};
    },

    componentDidMount: function () {
        this._loadTraceDatas();
    },

    _loadTraceDatas() {
        $.ajax({
            url: this.url,
            method: "GET",
            dataType: "json",
            success: function (data) {
                this.setState({contents: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.url, status, err.toString());
            }.bind(this)
        });
    },

    render() {
        return (
            <div style={cicadaTableStyle}>
                <CicadaTraceDiagramTable contents={this.state.contents}/>
            </div>
        );
    }
});

export default CicadaTraceDiagramComponent;
