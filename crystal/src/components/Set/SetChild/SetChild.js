import React from 'react'
import axios from 'axios'
import './SetChild.css'
import sets from './../SetHelper'
import serverPort from './../../../config/config'

export default class SetChild extends React.Component {
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
        axios.get('http://localhost:' + serverPort + '/api/cards?setCode=' + setCode).then(response => {
            this.setState({
                set: nextProps.set,
                asyncData: response.data,
                showImage: nextProps.showImage
            })
        })
    }

    componentDidMount() {
        var setCode = sets.getSetCode(this.state.set)
        axios.get('http://localhost:' + serverPort + '/api/cards?setCode=' + setCode).then(response => {
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
                    <table className="SetData-table">
                        <thead className="SetData-table-head">
                            <tr className="SetData-table-row">
                                <th className="SetData-table-head-column">Name</th>
                                <th className="SetData-table-head-column">Number</th> 
                                <th className="SetData-table-head-column">Rarity</th>
                                <th className="SetData-table-head-column">Image</th>
                                <th className="SetData-table-head-column">Owned</th>
                                <th className="SetData-table-head-column">Location</th>
                                <th className="SetData-table-head-column">Notes</th>
                            </tr>
                        </thead>
                        <tbody className="SetData-table-body">
                        {asyncData.map((data, index) => {
                            var imageColumn = <td className="SetData-table-data"><a href={data.imageUrl} key={data.imageUrl + index}>Link</a></td>
                            if(this.state.showImage) { imageColumn = <td className="SetData-table-data"><img src={data.imageUrl} alt="Card"/></td> }                    
                            var ownedColumn = <td className="SetData-table-data">No</td>
                            if(data.owned === true) { ownedColumn = <td className="SetData-table-data">Yes</td>}
                            var locationColumn = <td className="SetData-table-data">N/A</td>
                            if(data.location) { locationColumn = <td className="SetData-table-data">{data.location}</td> }
                            var notesColumn = <td className="SetData-table-data">N/A</td>
                            if(data.notes) { notesColumn = <td className="SetData-table-data">{data.notes}</td> }
                            return(
                                <tr key={index} className="SetData-table-row">
                                    <td className="SetData-table-data"><a href={"/edit/" + data.cardId}>{data.name}</a></td>
                                    <td className="SetData-table-data">{data.number}</td>
                                    <td className="SetData-table-data">{data.rarity}</td>
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