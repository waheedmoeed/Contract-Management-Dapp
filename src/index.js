import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter} from 'react-router-dom'

import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';

import Company from './Views/Company/Company';
import Employee from './Views/Employees/Employee';


const routing = (
    <BrowserRouter>
        <Route exact path="/" component={Home}/>
        <Route path = "/company" component={Company}/>
        <Route path = "/employee" component={Employee}/>  
    </BrowserRouter>
)


ReactDOM.render(routing, document.getElementById('root'));
