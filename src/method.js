/***********************************************************************
 *
 * Copyright (c) 2016 yirendai.com, Inc. All Rights Reserved
 *
 ***********************************************************************/

/**
 * @file	server.js
 * @author	zhaozecheng(zechengzhao@yirendai.com)
 * @date	2016-06-17 15:21
 * @brief	
 **/

import $ from 'jquery';
import {Link} from 'react-router';
import React, {Component} from 'react';
import {Table, DropdownButton, MenuItem} from 'react-bootstrap';

import * as config from './config';
import { cicadaTableStyle } from './cicada-style';
import CicadaPageFooter from './common/cicada-pagefooter';
import CicadaProjectSearchBar from './common/cicada-project-searchbar';

class CicadaMethodTableRow extends Component {
    render() {
        let menuId = "cicada-method-menu-" + this.props.id;
        let reportPagePath = "report/" + this.props.id;
        let reportPlotPath = "reportplot/" + this.props.id;
        let tracePagePath  = "trace/" + this.props.id;

        return (
            <tr>
                <td>{this.props.serviceId}</td>
                <td>{this.props.id}</td>
                <td>{this.props.methodName}</td>
                <td>{this.props.registerTime}</td>
                <td>
                    <div>
                    <DropdownButton bsStyle="info" title="操作" id={menuId}>
                        <MenuItem><Link to={reportPagePath}> 统计报表 </Link></MenuItem> 
                        <MenuItem><Link to={reportPlotPath}> 统计折线图 </Link></MenuItem> 
                        <MenuItem><Link to={tracePagePath}> Trace数据 </Link></MenuItem> 
                    </DropdownButton>
                        </div>
                </td>
            </tr>
        );
    }
}

const divVisibleStype = {"overflow-x": "visible"};

class CicadaMethodTable extends Component {
    render() {
        var rows = this.props.datas.map(function (data) {
            return (
                <CicadaMethodTableRow
                    serviceId={data.serviceId}
                    id={data.id}
                    methodName={data.methodName}
                    registerTime={data.registerTime}
                    key={data.id}>
                </CicadaMethodTableRow>
            );
        });

        return (
            <div>
                <Table striped>
                    <thead>
                    <tr>
                        <th>接口ID</th>
                        <th>#</th>
                        <th>方法名称</th>
                        <th>方法注册时间</th>
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

var CicadaMethodComponent = React.createClass({
    getInitialState: function() {
        this.url = config.server + config.MANAGER_URL_PATH + "/methods";
        this.condition = {
            page: 0,
            size: 20,
            searchText: '',
            serviceId: this.props.params.id
        };

        return {datas: [], pageCount: 1, resetPage: false};
    },

    componentDidMount: function() {
        this._loadMethodDatas(false);
    },

    _handleSearchSubmit: function(ctx) {
        for (var key in ctx) {
            this.condition[key] = ctx[key]
        }
        this.condition.page = 0;
        this._loadMethodDatas(true);
    },

    _handlePageSelectSubmit: function(ctx) {
        for (var key in ctx) {
            this.condition[key] = ctx[key]
        }
        this._loadMethodDatas(false);
    },

    _loadMethodDatas: function(resetPage) {

        $.ajax({
            url: this.url,
            method: "GET",
            data: this.condition,
            dataType: "json",
            success: function(data) {
                this.setState({datas: data.content, pageCount: data.totalPages, resetPage: resetPage});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    render: function() {
        return (
            <div style={cicadaTableStyle}>
                <CicadaProjectSearchBar onClickSubmit={this._handleSearchSubmit} />
                <CicadaMethodTable datas={this.state.datas}/>
                <CicadaPageFooter resetPage={this.state.resetPage}
                                  pageCount={this.state.pageCount}
                                  onPageClick={this._handlePageSelectSubmit} />
            </div>
        );
    }
});

export default CicadaMethodComponent;
