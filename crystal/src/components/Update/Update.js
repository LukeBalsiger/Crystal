import React from 'react'
import CrystalNavbar from '../Nav/Nav'
import './Update.css'
import data from './../../data/UIData'
import sets from '../../data/sets/setHelper'
import axios from 'axios'

export default class Update extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
        value: ""
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    var selectedSet = "Base Set"
    this.setState({
        value: selectedSet
    })
  }

  handleChange(event) {
    var selectedSet = event.target.value
    this.setState({
        value: selectedSet
    })
  }

  handleClick(event) {
        var selectedSet = this.state.value
        var result = sets.importSet(selectedSet)
        for(var i = 0; i < result.length; i++) {
            axios.post(
                "http://localhost:4030/api/cards",
                {
                    cardId: result[i].id,
                    name: result[i].name,
                    number: result[i].number,
                    setCode: result[i].setCode,
                    imageUrl: result[i].imageUrl,
                    rarity: result[i].rarity,
                    setName: result[i].set
                },
                { headers: { "content-type": "application/json" } }
            ).then((response) => {
                console.log(response)
            }).catch(function (error) {
                console.log(error)
            })
        }
  }
    

  render() {
    
    var cmbxItems = data.sets.map((set) => {
        if(set === "Base") {
            return <option key={set} selected value={`${set}`}>{set}</option>
        }
        return <option key={set} value={`${set}`}>{set}</option>
    })

    return (
      <div>
        <CrystalNavbar />
        <br />
        <label>Select the Set you wish update:   </label>
            <select className="SetData-select" value={this.state.value} onChange={this.handleChange}>
                {cmbxItems}
            </select>
        <br />
        <button className="button" onClick={this.handleClick}/>
      </div>
    )
  }
}