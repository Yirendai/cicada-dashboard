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
import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router';

import * as config from './config';
import { cicadaTableStyle } from './cicada-style';
import CicadaPageFooter from './common/cicada-pagefooter';
import CicadaProjectSearchBar from './common/cicada-project-searchbar';

class CicadaServiceTableRow extends Component {
    render() {
        let path = "service/" + this.props.id + "/methods";
        return (
            <tr>
                <td>{this.props.appId}</td>
                <td>{this.props.id}</td>
                <td>{this.props.serviceName}</td>
                <td>{this.props.registerTime}</td>
                <td>
                    <Button bsStyle="link">
                        <Link to={path}> 查看接口方法 </Link>
                    </Button>
                </td>
            </tr>
        );
    }
}

class CicadaServiceTable extends Component {
    render() {
        var rows = this.props.datas.map(function (data) {
            return (
                <CicadaServiceTableRow
                    appId={data.appId}
                    id={data.id}
                    serviceName={data.serviceName}
                    registerTime={data.registerTime}
                    key={data.id}>
                </CicadaServiceTableRow>
            );
        });

        return (
            <div>
                <Table striped>
                    <thead>
                    <tr>
                        <th>隶属项目ID</th>
                        <th>#</th>
                        <th>接口名称</th>
                        <th>接口注册时间</th>
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

var CicadaServiceComponent = React.createClass({
    getInitialState: function() {
        this.url = config.server + config.MANAGER_URL_PATH + "/services";
        this.condition = {
            page: 0,
            size: 20,
            searchText: '',
            appId: this.props.params.id
        };

        return {datas: [], pageCount: 1, resetPage: false};
    },

    componentDidMount: function() {
        this._loadServiceDatas(false);
    },

    _handleSearchSubmit: function(ctx) {
        for (var key in ctx) {
            this.condition[key] = ctx[key]
        }
        this.condition.page=20;
        this._loadServiceDatas(true);
    },

    _handlePageSelectSubmit: function(ctx) {
        for (var key in ctx) {
            this.condition[key] = ctx[key]
        }
        this._loadServiceDatas(false);
    },

    _loadServiceDatas: function(resetPage) {
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
                <CicadaServiceTable datas={this.state.datas}/>
                <CicadaPageFooter resetPage={this.state.resetPage}
                                  pageCount={this.state.pageCount}
                                  onPageClick={this._handlePageSelectSubmit} />
            </div>
        );
    }
});

export default CicadaServiceComponent;

