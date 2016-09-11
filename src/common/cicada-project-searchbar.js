/**
 * Created by zeche on 16/06/23.
 */

import React, {Component} from 'react';
import {InputGroup, FormGroup, FormControl, Button} from 'react-bootstrap';

var CicadaProjectSearchBar = React.createClass({
    getInitialState: function () {
        return {searchText: ''};
    },

    handleSubmit: function (e) {
        e.preventDefault();
        this.props.onClickSubmit({searchText: this.state.searchText, page: 0});
        return;
    },

    handleChange: function (e) {
        this.setState({searchText: e.target.value});
    },

    render: function () {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="formControlsText">
                        <InputGroup>
                            <InputGroup.Addon>输入查询词</InputGroup.Addon>
                            <FormControl type="text"
                                         placeholder="Enter text"
                                         value={this.state.searchText}
                                         onChange={this.handleChange}/>

                            <InputGroup.Button>
                                <Button type="submit">
                                    Search Now！
                                </Button>
                            </InputGroup.Button>
                        </InputGroup>
                    </FormGroup>
                </form>
            </div>
        );
    }
});

export default CicadaProjectSearchBar;