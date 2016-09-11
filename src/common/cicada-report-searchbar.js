/**
 * Created by zeche on 16/06/23.
 */

import React, {Component} from 'react';
import {InputGroup, Form, FormGroup, FormControl, Button} from 'react-bootstrap';
import DateTimeField from 'react-bootstrap-datetimepicker';

var CicadaReportSearchBar = React.createClass({
    getInitialState: function () {
        return {
            methodId: this.props.condition.methodId,
            beginTime: this.props.condition.beginTime,
            endTime: this.props.condition.endTime,
        };
    },

    handleSubmit: function (e) {
        e.preventDefault();
        this.props.onSubmitCallback(this.state);
        return;
    },

    render: function () {
        return (
            <div>
                <Form inline>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon>方法ID</InputGroup.Addon>
                            <FormControl type="text"
                                         value={this.state.methodId}
                                         disabled/>
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Addon>起始时间</InputGroup.Addon>
                            <DateTimeField
                                dateTime={this.state.beginTime.getTime()}
                                onChange={(value) => {
                                        this.setState({beginTime:
                                                new Date(parseInt(value))})
                                            }
                                        }/>
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Addon>结束时间</InputGroup.Addon>
                            <DateTimeField
                                dateTime={this.state.endTime.getTime()}
                                onChange={(value) => {
                                        this.setState({endTime:
                                                new Date(parseInt(value))})
                                            }
                                        }/>
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Button>
                                <Button type="submit" onClick={this.handleSubmit}> 查询 </Button>
                            </InputGroup.Button>
                        </InputGroup>
                    </FormGroup>
                </Form>
            </div>
        );
    }
});

export default CicadaReportSearchBar;