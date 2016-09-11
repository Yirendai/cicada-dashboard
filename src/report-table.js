import React, {Component} from 'react';
import $ from 'jquery';
import {Table} from 'react-bootstrap';

import * as config from './config';
import {cicadaTableStyle} from './cicada-style';
import CicadaPageFooter from './common/cicada-pagefooter';
import CicadaReportSearchBar from './common/cicada-report-searchbar';

class CicadaReportTableRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.count}</td>
                <td>{this.props.failureRate}</td>
                <td>{this.props.avgDuration}</td>
                <td>{this.props.minDuration}</td>
                <td>{this.props.maxDuration}</td>
                <td>{this.props.line95Duration}</td>
                <td>{this.props.line999Duration}</td>
                <td>{this.props.statisTime}</td>
            </tr>
        );
    }
}

class CicadaReportTable extends Component {
    render() {
        var rows = this.props.contents.map(function(data) {
            return (
                <CicadaReportTableRow
                        count={data.count}
                        failureRate={data.failureRate}
                        avgDuration={data.avgDuration}
                        minDuration={data.minDuration}
                        maxDuration={data.maxDuration}
                        line95Duration={data.line95Duration}
                        line999Duration={data.line999Duration}
                        statisTime={data.statisTime}
                        key={data.id}
                    >
                </CicadaReportTableRow>
            );
        });

        return (
            <div>
                <Table striped>
                    <thead>
                    <tr>
                        <th>请求数</th>
                        <th>失败率</th>
                        <th>平均响应时间</th>
                        <th>最小响应时间</th>
                        <th>最大响应时间</th>
                        <th>95Line</th>
                        <th>999Line</th>
                        <th>统计时间</th>
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

var CicadaReportTableComponent = React.createClass({
    getInitialState: function () {
        this.url = config.server + config.WEB_URL_PATH + "/statisinfos/spans";

        let curTime = new Date();
        this.searchCondition = {
            methodId: this.props.params.methodId,
            beginTime: new Date(curTime.getTime() - 86400 * 1000),
            endTime: new Date(),
            page: 0,
            size: 20
        };
        return {contents: [], pageCount: 0, resetPage: false};
    },

    componentDidMount: function() {
        this._loadReportDatas(false);
    },

    _handleSearchSubmit(condition) {
        for (var key in condition) {
            this.searchCondition[key] = condition[key];
        }
        this.searchCondition.page = 0;
        this._loadReportDatas(true);
    },

    _handlePageSelectSubmit(condition) {
        for (var key in condition) {
            this.searchCondition[key] = condition[key];
        }
        this._loadReportDatas(false);
    },

    _loadReportDatas(resetPage) {
        $.ajax({
            url: this.url,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(this.searchCondition),
            dataType: "json",
            success: function(data) {
                this.setState({contents: data.content,
                    pageCount: data.totalPages,
                    resetPage: resetPage});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    render: function () {
        return (
            <div style={cicadaTableStyle}>
                <CicadaReportSearchBar
                    condition={this.searchCondition}
                    onSubmitCallback={this._handleSearchSubmit} />
                <CicadaReportTable contents={this.state.contents} />
                <CicadaPageFooter
                    resetPage={this.state.resetPage}
                    pageCount={this.state.pageCount}
                    onPageClick={this._handlePageSelectSubmit} />
            </div>
        );
    }
});


export default CicadaReportTableComponent;
