import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Home from './components/Home/Home'
import TCGData from './components/TCGData/TCGData'
import SetData from './components/SetData/SetData'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter, Route } from 'react-router-dom'


ReactDOM.render(
    <BrowserRouter>
        <React.Fragment>
            <Route exact path="/" component={Home}/>
            <Route path="/cards" component={TCGData}/>
            <Route path="/sets" component={SetData}/>
        </React.Fragment>
    </BrowserRouter>, document.getElementById('root'))
registerServiceWorker()
