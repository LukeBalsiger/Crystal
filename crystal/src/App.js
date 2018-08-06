import React, { Component } from 'react'
import './App.css'
import CrystalNavbar from './components/Nav/Nav'
import TCGData from './TCGData'


class App extends Component {
  render() {
    return (
      <div>
        <CrystalNavbar />
        <TCGData />
      </div>
    );
  }
}

export default App;
