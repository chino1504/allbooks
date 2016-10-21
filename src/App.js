import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import FormSearch from './form-components/form-search';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <FormSearch />
            </div>
        );
    }
}

export default App;
