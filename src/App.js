import React, { Component } from 'react';
import './App.css';
import Header from './Header';
//import FormSearch from './form-components/form-search';
import FormLogin from './page-components/login-page';
import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCAjldpMucRCU8prGFnByMXFZ7pNzV31k8",
    authDomain: "allbooks-2b844.firebaseapp.com",
    databaseURL: "https://allbooks-2b844.firebaseio.com",
    storageBucket: "allbooks-2b844.appspot.com",
    messagingSenderId: "1067582285200"
};
firebase.initializeApp(config);

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
