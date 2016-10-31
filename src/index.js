import './index.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import ResultsPage from './page-components/results-page';
//import FormSearch from './form-components/form-search';
import FormInput from './form-components/form-input';
import { Router, Route, browserHistory } from 'react-router'

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}/>
        <Route path="/results" component={ResultsPage}/>
        <Route path="/search" component={FormInput}/>
    </Router>
), document.getElementById('root'))
