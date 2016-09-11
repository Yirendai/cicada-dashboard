/**
 * Created by Zecheng on 16/06/15.
 */

import $ from 'jquery';
import {Link} from 'react-router';
import React, {Component} from 'react';
import {Table, Button} from 'react-bootstrap';

import CicadaProjectSearchBar from './common/cicada-project-searchbar';
import CicadaPageFooter from './common/cicada-pagefooter';
import {cicadaTableStyle} from './cicada-style';
import * as config from './config';

class CicadaAppTableRow extends Component {
    render() {
        let path = "app/" + this.props.id + "/services";
        return (
            <tr>
                <td>{this.props.id}</td>
                <td>{this.props.appName}</td>
                <td>{this.props.registerTime}</td>
                <td>
                    <Button bsStyle="link">
                        <Link to={path}> 查看项目接口 </Link>
                    </Button>
                </td>
            </tr>
        );
    }
}

class CicadaAppTable extends Component {
    render() {
        var rows = this.props.datas.map(function(data) {
            return (
                <CicadaAppTableRow
                    id={data.id}
                    appName={data.appName}
                    registerTime={data.registerTime}
                    key={data.id}>
                </CicadaAppTableRow>
            );
        });

        return (
            <div>
                <Table striped>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>项目名称</th>
                        <th>项目注册时间</th>
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

var CicadaAppComponent = React.createClass({
    getInitialState: function() {
        this.url = config.server + config.MANAGER_URL_PATH + "/apps";
        this.condition = {
            page: 0,
            size: 20,
            searchText: ''
        };

        return {datas: [], pageCount: 1, resetPage: false};
    },

    componentDidMount: function() {
        this._loadAppDatas(false);
    },

    _handleSearchSubmit: function(ctx) {
        for (var key in ctx ) {
            this.condition[key] = ctx[key]
        }
        this.condition.page = 0;
        this._loadAppDatas(true);
    },

    _handlePageSelectSubmit: function(ctx) {
        for (var key in ctx ) {
            this.condition[key] = ctx[key]
        }

        this._loadAppDatas(false);
    },

    _loadAppDatas: function(resetPage) {
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
                <CicadaAppTable datas={this.state.datas}/>
                <CicadaPageFooter resetPage={this.state.resetPage}
                                  pageCount={this.state.pageCount}
                                  onPageClick={this._handlePageSelectSubmit} />
            </div>
        );
    }
});

export default CicadaAppComponent;

