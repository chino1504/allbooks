import './index.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import ResultsPage from './page-components/results-page';
import { Router, Route, browserHistory } from 'react-router'

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}/>
        <Route path="/results" component={ResultsPage}/>
    </Router>
), document.getElementById('root'))
