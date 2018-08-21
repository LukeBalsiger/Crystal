import React from 'react'
import CrystalNavbar from '../../Nav/Nav'
import CardChild from '../CardChild/CardChild'
import './CardParent.css'
import data from './../../../data/UIData'

export default class CardParent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pokemon: "bulbasaur",
            showImage: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleImageCheck = this.handleImageCheck.bind(this);
    }

    handleImageCheck() {
        this.setState({
            showImage: !this.state.showImage
        })
    }

    handleChange(event) {
        this.setState({
            pokemon: event.target.value
        })
    }

    render() {
        var cmbxItems = data.names.map((pokemon) => {
            if(pokemon === "bulbasaur") {
                return <option key={pokemon} selected value={`${pokemon}`}>{pokemon}</option>
            }
            return <option key={pokemon} value={`${pokemon}`}>{pokemon}</option>
        })

        return (
            <div>
                <CrystalNavbar />
                <br />
                <div className="CardData-form-block">
                    <form>
                        <label>Select the pokemon you wish to see card information for:   </label>
                        <select className="CardData-select" value={this.state.pokemon} onChange={this.handleChange}>
                            {cmbxItems}
                        </select>
                        <br />
                        <input type="checkbox" value={this.state.showImage} onChange={this.handleImageCheck}/>
                        <label>Show images</label>
                    </form>
                </div>
                <br />
                <CardChild pokemon={this.state.pokemon} showImage={this.state.showImage}/>
            </div>
        )
    }
}