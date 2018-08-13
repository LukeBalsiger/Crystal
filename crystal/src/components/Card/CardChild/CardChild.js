import React from 'react'
import axios from 'axios'
import './CardChild.css'

export default class CardChild extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pokemon: this.props.pokemon,
            asyncData: null,
            showImage: this.props.showImage
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.pokemon)
        var pokemon  = nextProps.pokemon.charAt(0).toUpperCase() + nextProps.pokemon.substr(1);
        console.log(pokemon)
        axios.get('http://localhost:8000/api/cards?name=' + pokemon).then(response => {
            this.setState({
                pokemon: nextProps.pokemon,
                asyncData: response.data,
                showImage: nextProps.showImage
            })
        })
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/cards?name=Bulbasaur').then(response => {
            this.setState({
                asyncData: response.data
            })
        })
    }

    render() {
        const { asyncData } = this.state

        if(asyncData === null) {
            return(<p>Loading...</p>)
        }
        else {
            return (
                <div>
                    <table className="TCGData-table">
                        <thead className="TCGData-table-head">
                            <tr className="TCGData-table-row">
                                <th className="TCGData-table-head-column">Name</th>
                                <th className="TCGData-table-head-column">Number</th> 
                                <th className="TCGData-table-head-column">Rarity</th>
                                <th className="TCGData-table-head-column">Image</th>
                                <th className="TCGData-table-head-column">Owned</th>
                                <th className="TCGData-table-head-column">Location</th>
                                <th className="TCGData-table-head-column">Notes</th>
                            </tr>
                        </thead>
                        <tbody className="TCGData-table-body">
                        {asyncData.map((data, index) => {
                            var imageColumn = <td className="TCGData-table-data"><a href={data.imageUrl} key={data.imageUrl + index}>Link</a></td>
                            if(this.state.showImage) { imageColumn = <td className="TCGData-table-data"><img src={data.imageUrl} alt="Card"/></td> }                    
                            var ownedColumn = <td className="TCGData-table-data">No</td>
                            if(data.owned === true) { ownedColumn = <td className="TCGData-table-data">Yes</td>}
                            var locationColumn = <td className="TCGData-table-data">N/A</td>
                            if(data.location) { locationColumn = <td className="TCGData-table-data">{data.location}</td> }
                            var notesColumn = <td className="TCGData-table-data">N/A</td>
                            if(data.notes) { notesColumn = <td className="TCGData-table-data">{data.notes}</td> }
                            return(
                                <tr key={index} className="TCGData-table-row">
                                    <td className="TCGData-table-data"><a href={"/edit/" + data.cardId}>{data.name}</a></td>
                                    <td className="TCGData-table-data">{data.number}</td>
                                    <td className="TCGData-table-data">{data.rarity}</td>
                                    {imageColumn}
                                    {ownedColumn}
                                    {locationColumn}
                                    {notesColumn}
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}