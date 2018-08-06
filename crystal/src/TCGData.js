import React from 'react';
import './TCGData.css';
import data from './data/UIData'

export default class TCGData extends React.Component {

  render() {

    var cmbxItems = data.names.map((name) => {
        if(name === "bulbasaur") {
            return <option selected value={`${name}`}>{name}</option>
        }
        return <option value={`${name}`}>{name}</option>
    });

    var list = ["card 1", "card 2"]

    var allCardsForSelected = list.map((card) => {
      return <li>{card}</li>
    })
    return (
      <div>
        <form>
            <select id="TCGData-pokemon-select" className="TCGData-select">
                {cmbxItems}
            </select>
        </form>
        <div>
          <ul className="TCGData-ul">
            {allCardsForSelected}
          </ul>
        </div>
      </div>
    );
  }
}