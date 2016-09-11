/***********************************************************************
 *
 * Copyright (c) 2016 yirendai.com, Inc. All Rights Reserved
 *
 ***********************************************************************/

/**
 * @file    urls.js
 * @author  zhaozecheng(zechengzhao@yirendai.com)
 * @date    2016-06-17 13:25
 * @brief   
 **/

import React, {Component} from 'react';
import {Router, Route, IndexRoute, Link, hashHistory} from 'react-router';

import CicadaAppComponent from './app';
import CicadaServiceComponent from './service';
import CicadaMethodComponent from './method';
import CicadaReportTableComponent from './report-table';
import CicadaReportPlotComponent from './report-plot';
import CicadaTraceTableComponent from './trace-table';
import CicadaTraceDiagramComponent from './trace-diagram';

import CicadaFramework from './cicada-framework';

class UrlRouter extends Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={CicadaFramework}>
                    <IndexRoute component={CicadaAppComponent} />

                    <Route path="apps" component={CicadaAppComponent} />
                    <Route path="app/:id/services" component={CicadaServiceComponent} />
                    <Route path="service/:id/methods" component={CicadaMethodComponent} />

                    {/* 统计数据 && 统计图表 */}
                    <Route path="report/:methodId" component={CicadaReportTableComponent} />
                    <Route path="reportplot/:methodId" component={CicadaReportPlotComponent} />

                    {/* 日志数据 && Trace图表 */}
                    <Route path="trace/:methodId" component={CicadaTraceTableComponent} />
                    <Route path="tracediagram/:traceId" component={CicadaTraceDiagramComponent} />

                </Route>
            </Router>
        );
    }
}

export default UrlRouter;
