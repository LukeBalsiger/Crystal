import React, { Component } from 'react'
import './Home.css'
import CrystalNavbar from './../Nav/Nav'


export default class Home extends Component {
  render() {
    return (
      <div>
        <CrystalNavbar />
        <h1>Welcome!</h1>
      </div>
    );
  }
}