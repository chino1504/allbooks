import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import AppInput from './form-components/app-input';
import { Form } from 'react-bootstrap';

class App extends Component {
    render() {
        return (
          <div className="App">
            <Header />
            <Form inline>
              <AppInput inputLabel="Nombre" placeholder="Nombre"/>
              <AppInput inputLabel="Autor" placeholder="Autor"/>
              <AppInput inputLabel="Año" placeholder="Año"/>
              <AppInput inputLabel="Descripción" placeholder="Descripción"/>
            </Form>
            <p className="App-intro">
              To get started, ask help to rodri.
            </p>
          </div>
        );
    }
}

export default App;
