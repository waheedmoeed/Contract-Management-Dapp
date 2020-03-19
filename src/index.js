import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter} from 'react-router-dom'

import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';

import Company from './Views/Company/Company';
import Employee from './Views/Employees/Employee';

import * as serviceWorker from './serviceWorker';


const routing = (
    <BrowserRouter>
        <Route exact path="/" component={Home}/>
        <Route path = "/company" component={Company}/>
        <Route path = "/employee" component={Employee}/>  
    </BrowserRouter>
)


ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
