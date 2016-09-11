/**
 * Created by Zecheng on 16/6/22.
 * report diagram for cicada statistic results
 */

import $ from 'jquery';
import _ from 'underscore';
import React, {Component} from 'react';
import {Panel} from 'react-bootstrap';
import ReactHighcharts from 'react-highcharts';

import * as config from './config';
import {cicadaTableStyle} from './cicada-style';
import CicadaReportSearchBar from './common/cicada-report-searchbar';

var CicadaReportPlotUnit = React.createClass({
    render: function () {
        let config = {
            chart: {
                zoomType: 'x',
                spacingRight: 20
            },
            title : {
                text : this.props.data.title
            },
            xAxis: {
                categories: this.props.data.statisTimes
            },
            series: [{
                name: this.props.data.title,
                data: this.props.data.contents
            }]
        };

        return (
            <Panel header={this.props.data.title} bsStyle="success">
                <ReactHighcharts config={config} />
            </Panel>
        );
    }
});

var CicadaReportPlot = React.createClass({
    getInitialState: function () {
        this.reportCategories = {
            failureRate: "失败率",
            avgDuration: "平均响应时间",
            minDuration: "最小响应时间",
            maxDuration: "最大响应时间",
            line95Duration: "95Line",
            line999Duration: "999Line"
        }
        return {};
    },
    render: function () {
        let plotParams = [];
        let statisTimes = this.props.datas.map((obj) => obj.statisTime);
        _.mapObject(this.reportCategories, (value, key) => {
            let plotParam = {
                name: key,
                title: value,
                statisTimes: statisTimes
            };
            plotParam.contents = this.props.datas.map((obj) => obj[key]);

            plotParams.push(plotParam);
        });

        let plots = plotParams.map((param) => {
            return (
                <CicadaReportPlotUnit data={param} key={param.name} />
            )
        });

        return (
            <div>
                {plots}
            </div>
        );
    }
});

var CicadaReportPlotComponent = React.createClass({
    getInitialState: function () {
        this.url = config.server + config.WEB_URL_PATH + "/statisinfos/spans/all";
        let curTime = new Date();
        this.searchCondition = {
            methodId: this.props.params.methodId,
            beginTime: new Date(curTime.getTime() - 86400 * 1000),
            endTime: new Date(),
        };

        return {contents: []};
    },

    componentDidMount: function() {
        this._loadReportDatas();
    },

    _handleSearchSubmit(condition) {
        for (var key in condition) {
            this.searchCondition[key] = condition[key];
        }
        this._loadReportDatas();
    },

    _loadReportDatas() {
        $.ajax({
            url: this.url,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(this.searchCondition),
            dataType: "json",
            success: function (data) {
                this.setState({contents: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    render: function () {
        return (
            <div style={cicadaTableStyle}>
                <CicadaReportSearchBar
                    condition={this.searchCondition}
                    onSubmitCallback={this._handleSearchSubmit}/>
                <CicadaReportPlot datas={this.state.contents} />
            </div>
        );
    }
});

export default CicadaReportPlotComponent;
