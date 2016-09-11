/**
 * Created by zeche on 16/06/23.
 */

import React, {Component} from 'react';
import {Link} from 'react-router';
import {Navbar} from 'react-bootstrap';

class CicadaNavbar extends Component {
    render() {
        return (
            <div>
                <Navbar inverse>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <span>Cicada</span>
                        </Navbar.Brand>
                        <Navbar.Brand>
                            <Link to="/">项目管理</Link>
                        </Navbar.Brand>
                    </Navbar.Header>
                </Navbar>
            </div>
        );
    }
}

export default CicadaNavbar;