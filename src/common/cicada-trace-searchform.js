/**
 * Created by zeche on 16/06/23.
 */

import React, {Component} from 'react';
import {Form, FormGroup, FormControl, Col} from 'react-bootstrap';
import {Button, ControlLabel, Checkbox} from 'react-bootstrap';
import DateTimeField from 'react-bootstrap-datetimepicker';

var CicadaTraceSearchForm = React.createClass({
    getInitialState: function () {
        return {
            methodId: this.props.condition.methodId,
            beginTime: this.props.condition.beginTime,
            endTime: this.props.condition.endTime,
            floorDuration: this.props.condition.floorDuration,
            ceilDuration: this.props.condition.ceilDuration,
            fetchErrorSpan: this.props.fetchErrorSpan
        };
    },

    _handleSubmit: function(e) {
        e.preventDefault();
        this.props.onSubmitCallback(this.state);
    },

    _handleErrorSpanCheck(e) {
        this.state.fetchErrorSpan = e.target.checked;
    },

    render: function () {
        return (
            <div>
                <Form horizontal>
                    <FormGroup>
                        <Col sm={2}><ControlLabel>服务方法ID</ControlLabel></Col>
                        <Col sm={8}>
                            <FormControl type="text" value={this.state.methodId} disabled/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col sm={2}><ControlLabel>请求时间范围</ControlLabel></Col>
                        <Col sm={4}>
                            <DateTimeField dateTime={this.state.beginTime.getTime()}
                                           onChange={(value) => {this.setState({beginTime: new Date(parseInt(value))})}}/>
                        </Col>

                        <Col sm={4}>
                            <DateTimeField dateTime={this.state.endTime.getTime()}
                                           onChange={(value) => {this.setState({endTime:new Date(parseInt(value))})}}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col sm={2}><ControlLabel>响应时间范围</ControlLabel></Col>
                        <Col sm={3}>
                            <FormControl type="text"
                                         placeholder={this.state.floorDuration}
                                         onChange={(e) => this.setState({floorDuration: e.target.value})}/>
                        </Col>
                        <Col sm={1}><ControlLabel>~</ControlLabel></Col>
                        <Col sm={3}>
                            <FormControl type="text"
                                         placeholder={this.state.ceilDuration}
                                         onChange={(e) => this.setState({ceilDuration: e.target.value})}/>
                        </Col>
                        <Col sm={1}><ControlLabel>ms</ControlLabel></Col>
                    </FormGroup>

                    <FormGroup>
                        <Col sm={2}><ControlLabel>只查看异常数据</ControlLabel></Col>
                        <Col sm={8}>
                            <Checkbox onChange={this._handleErrorSpanCheck} />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={8}>
                            <Button bsStyle="primary" onClick={this._handleSubmit}> 查询 </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
});

export default CicadaTraceSearchForm;