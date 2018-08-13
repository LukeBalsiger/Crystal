import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Home from './components/Home/Home'
import TCGData from './components/TCGData/TCGData'
import Set from './components/Set/Set'
import Update from './components/Update/Update'
import TestParent from './components/TestParent/TestParent'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter, Route } from 'react-router-dom'


ReactDOM.render(
    <BrowserRouter>
        <React.Fragment>
            <Route exact path="/" component={Home}/>
            <Route path="/cards" component={TCGData}/>
            <Route path="/sets" component={Set}/>
            <Route path="/test" component={TestParent}/>
            <Route path="/update" component={Update}/>
        </React.Fragment>
    </BrowserRouter>, document.getElementById('root'))
registerServiceWorker()
