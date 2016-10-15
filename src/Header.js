import React, { Component } from 'react';
import book from './book.svg';
import './Header.css';
//import { Navbar, Jumbotron, Button } from 'react-bootstrap';

class Header extends Component {
    render() {
        return (
          <div className="header">
              <img src={book} className="header-logo" alt="logo" />
              <h2>Welcome to allBooks</h2>
          </div>
        );
    }
}

export default Header;
