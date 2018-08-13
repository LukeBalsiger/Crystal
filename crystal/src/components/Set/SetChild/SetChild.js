import React from 'react'
import axios from 'axios'
import './SetChild.css'
import sets from './../SetHelper'

export default class TestChild extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            set: this.props.set,
            asyncData: null,
            showImage: this.props.showImage
        }
    }

    componentWillReceiveProps(nextProps) {
        var setCode = sets.getSetCode(nextProps.set)
        axios.get('http://localhost:8000/api/cards?setCode=' + setCode).then(response => {
            this.setState({
                set: nextProps.set,
                asyncData: response.data,
                showImage: nextProps.showImage
            })
        })
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/cards?setCode=base1').then(response => {
            console.log(response.data)
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
                                    <td className="TCGData-table-data">{data.name}</td>
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





/*
                <ul>
                    {asyncData.map(data =>
                        <li key={data.name}>
                        <a href={data.imageUrl}>{data.owned.toString()}</a>
                        </li>
                    )}
                </ul>
                */
            )
        }
    }
}