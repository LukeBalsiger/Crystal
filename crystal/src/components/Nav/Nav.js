import React from 'react';
import logo from './../../logo.svg';
import './Nav.css';

export default class CrystalNavbar extends React.Component {

  render() {
    return (
      <div>
        <ul className="Navbar-ul">
          <li className="Navbar-li"><a href="/"><img src={logo} className="Nav-logo" alt="logo" /></a></li>
          <li className="Navbar-li"><a href="/cards">Cards</a></li>
          <li className="Navbar-li"><a href="/sets/Base Set">Sets</a></li>
          <li className="Navbar-li"><a href="/collection">Collection</a></li>
          {/*<li className="Navbar-li"><a href="/update">Update</a></li>*/}
        </ul>
      </div>
    )
  }
}