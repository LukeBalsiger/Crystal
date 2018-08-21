import React from 'react'
import axios from 'axios'
import './CollectionChild.css'
import config from '../../../config/config'

export default class CollectionChild extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            location: this.props.location,
            asyncData: null,
            showImage: this.props.showImage
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('http://localhost:' + config.serverPort + '/api/cards?location=' + nextProps.location)
        axios.get('http://localhost:' + config.serverPort + '/api/cards?location=' + nextProps.location).then(response => {
            this.setState({
                location: nextProps.location,
                asyncData: response.data,
                showImage: nextProps.showImage
            })
        })
    }

    componentDidMount() {
        axios.get('http://localhost:' + config.serverPort + '/api/cards?location=Main%20Binder%201').then(response => {
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
                    <table className="CollectionData-table">
                        <thead className="CollectionData-table-head">
                            <tr className="CollectionData-table-row">
                                <th className="CollectionData-table-head-column">Name</th>
                                <th className="CollectionData-table-head-column">Set</th>
                                <th className="CollectionData-table-head-column">Number</th> 
                                <th className="CollectionData-table-head-column">Rarity</th>
                                <th className="CollectionData-table-head-column">Image</th>
                                <th className="CollectionData-table-head-column">Owned</th>
                                <th className="CollectionData-table-head-column">Location</th>
                                <th className="CollectionData-table-head-column">Notes</th>
                            </tr>
                        </thead>
                        <tbody className="CollectionData-table-body">
                        {asyncData.map((data, index) => {
                            var imageColumn = <td className="CollectionData-table-data"><a href={data.imageUrl} key={data.imageUrl + index}>Link</a></td>
                            if(this.state.showImage) { imageColumn = <td className="CollectionData-table-data"><img src={data.imageUrl} alt="Card"/></td> }                    
                            var ownedColumn = <td className="CollectionData-table-data">No</td>
                            if(data.owned === true) { ownedColumn = <td className="CollectionData-table-data">Yes</td>}
                            var locationColumn = <td className="CollectionData-table-data">N/A</td>
                            if(data.location) { locationColumn = <td className="CollectionData-table-data">{data.location}</td> }
                            var notesColumn = <td className="CollectionData-table-data">N/A</td>
                            if(data.notes) { notesColumn = <td className="CollectionData-table-data">{data.notes}</td> }
                            return(
                                <tr key={index} className="CollectionData-table-row">
                                    <td className="CollectionData-table-data"><a href={"/edit/" + data.cardId}>{data.name}</a></td>
                                    <td className="CollectionData-table-data"><a href={"/sets/" + data.setName}>{data.setName}</a></td>
                                    <td className="CollectionData-table-data">{data.number}</td>
                                    <td className="CollectionData-table-data">{data.rarity}</td>
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