import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Home from './components/Home/Home'
import Update from './components/Update/Update'
import Edit from './components/Edit/Edit'
import SetParent from './components/Set/SetParent/SetParent'
import CardParent from './components/Card/CardParent/CardParent'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter, Route } from 'react-router-dom'


ReactDOM.render(
    <BrowserRouter>
        <React.Fragment>
            <Route exact path="/" component={Home}/>
            <Route path="/sets" component={SetParent}/>
            <Route path="/update" component={Update}/>
            <Route path="/cards" component={CardParent}/>
            <Route path="/edit/:id" component={Edit}/> 
        </React.Fragment>
    </BrowserRouter>, document.getElementById('root'))
registerServiceWorker()
