import React, {Component} from 'react';
import $ from 'jquery';
import {Link} from 'react-router';
import {Table, Checkbox} from 'react-bootstrap';

import * as config from './config';
import {cicadaTableStyle} from './cicada-style';
import CicadaTraceSearchForm from './common/cicada-trace-searchform';
import CicadaNolimitPageFooter from './common/cicada-nolimit-pagefooter';

class CicadaTraceTableRow extends Component {
    render() {
        let tracePath = "tracediagram/" + this.props.traceId;
        return (
            <tr>
                <td>{this.props.traceId}</td>
                <td>{this.props.durationServer}</td>
                <td><Checkbox checked={this.props.rootSpan} disable /></td>
                <td><Checkbox checked={this.props.hasException} disable /></td>
                <td>{this.props.startTime}</td>
                <td>
                    <Link to={tracePath}> 查看调用链 </Link>
                </td>
            </tr>
        );
    }
}

class CicadaTraceTable extends Component {
    render() {
        var rows = this.props.contents.map(function(data) {
            return (
                <CicadaTraceTableRow
                    traceId={data.traceId}
                    durationServer={data.durationServer}
                    rootSpan={data.rootSpan}
                    hasException={data.hasException}
                    startTime={data.startTime}
                    key={data.traceId}
                >
                </CicadaTraceTableRow>
            );
        });

        return (
            <div>
                <Table striped>
                    <thead>
                    <tr>
                        <th>traceID</th>
                        <th>服务端响应时间</th>
                        <th>是否最外层接口</th>
                        <th>请求异常</th>
                        <th>请求开始时间</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </Table>
            </div>
        );
    }
}

var CicadaTraceTableComponent = React.createClass({

    getInitialState: function () {

        this.spanUrl = config.server + config.WEB_URL_PATH + "/entities/spans";
        this.errorSpanUrl = config.server + config.WEB_URL_PATH + "/entities/errorspans";

        let curTime = new Date();
        this.searchCondition = {
            methodId: parseInt(this.props.params.methodId),
            beginTime: new Date(curTime.getTime() - 86400 * 1000),
            endTime: new Date(),
            floorDuration: 0,
            ceilDuration: 100 * 1000,
            page: 0,
            size: 20
        };
        this.fetchErrorSpan = false;

        return {contents: [], resetPage: false};
    },

    componentDidMount: function() {
        this._loadTraceDatas(false);
    },

    _handleSearchSubmit(formParams) {
        if ("fetchErrorSpan" in formParams) {
            this.fetchErrorSpan = formParams.fetchErrorSpan;
            delete formParams.fetchErrorSpan;
        }
        for (var key in formParams) {
            this.searchCondition[key] = formParams[key];
        }
        this.searchCondition.page = 0;
        this._loadTraceDatas(true);
    },

    _handlePageSelectSubmit(ctx) {
        for (var key in ctx) {
            this.searchCondition[key] = ctx[key];
        }
        this._loadTraceDatas(false);
    },

    _loadTraceDatas(resetPage) {
        let url = this.fetchErrorSpan ? this.errorSpanUrl : this.spanUrl;
        $.ajax({
            url: url,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(this.searchCondition),
            dataType: "json",
            success: function(data) {
                this.setState({contents: data, resetPage: resetPage});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(url, status, err.toString());
            }.bind(this)
        });
    },

    render: function () {
        return (
            <div style={cicadaTableStyle}>
                <CicadaTraceSearchForm
                    condition={this.searchCondition} fetchErrorSpan={this.fetchErrorSpan}
                    onSubmitCallback={this._handleSearchSubmit} />
                <CicadaTraceTable contents={this.state.contents} />
                <CicadaNolimitPageFooter resetPage={this.state.resetPage}
                                         handleClickCallback={this._handlePageSelectSubmit} />
            </div>
        );
    }
});

export default CicadaTraceTableComponent;
