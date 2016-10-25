import React, { Component } from 'react';
import './App.css';
import Header from './Header';
//import FormSearch from './form-components/form-search';
import FormLogin from './page-components/login-page';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <FormLogin />
            </div>
        );
    }
}

export default App;
