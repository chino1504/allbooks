import React, { Component } from 'react';
import book from './book.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={book} className="App-logo" alt="logo" />
          <h2>Welcome to allBooks</h2>
        </div>
        <p className="App-intro">
          To get started, ask help to rodri.
        </p>
      </div>
    );
  }
}

export default App;
