import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../Sidebar/Sidebar';
import routes from '../../routes'
import logo from '../../assets/img/hmm.png'
import {browserHistory} from 'react-router'
import './Navbar.css';

import image from "../../assets/img/sidebar-2.jpg";

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            routes: [],
            user: {}
        }
    }

    componentWillMount() {
        if (!localStorage.getItem('hmm_token')) {
            browserHistory.push('/login');
        }

        this.setState({
            user: localStorage.getItem('username'),
        })
    }

    componentDidMount() {
        this.setState({
            routes: routes
        })
    }

    render() {
        return (
            <Sidebar 
                routes={this.state.routes}
                logoText={"HMM"}
                logo={logo}
                color={"blue"}
                bgColor={"black"}
                user={this.state.user}
                image={image}
                miniActive={this.props.miniActive}
                open={this.props.open}
            />
        )
    }
}

Navbar.propTypes = {
    miniActive: PropTypes.bool,
    open: PropTypes.bool,
}

export default Navbar;
