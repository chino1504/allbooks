import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import FormSearch from './form-components/form-search';
import { Form } from 'react-bootstrap';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <Form>
                    <FormSearch />
                </Form>
            </div>
        );
    }
}

export default App;
