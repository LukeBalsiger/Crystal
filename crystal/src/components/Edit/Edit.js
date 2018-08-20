import React from 'react'
import CrystalNavbar from '../Nav/Nav'
import './Edit.css'
import axios from 'axios'
import config from '../../config/config'
import Select from 'react-select';

export default class Edit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            asyncData: null,
            owned: false,
            location: '',
            notes: '',
        }

        this.handleOwnedChange = this.handleOwnedChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleNotesChange = this.handleNotesChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:' + config.serverPort + '/api/cards?cardId=' + this.state.id).then(response => {
            this.setState({
                asyncData: response.data[0],
                owned: response.data[0].owned,
                location: response.data[0].location,
                notes: response.data[0].notes
            })
        })
    }

    handleOwnedChange() {
        this.setState({
            owned: !this.state.owned
        })
    }

    handleLocationChange(event) {
        this.setState({
            location: event.target.value
        })
    }

    handleNotesChange(event) {
        this.setState({
            location: event.target.value
        })
    }

    handleSave() {
        axios.patch(
            "http://localhost:" + config.serverPort + "/api/cards/" + this.state.id,
            {
                cardId: this.state.id,
                owned: this.state.owned,
                location: this.state.location,
                notes: this.state.notes
            },
            { headers: { "content-type": "application/json" } }
        ).then((response) => {
            console.log(response)
            alert("Saved!")
        }).catch(function (error) {
            console.log(error)
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
                    <CrystalNavbar />
                    <br />
                    <div className="EditImage">
                        <img src={asyncData.imageUrl} alt="Card" />
                    </div>
                    <div className="EditForm">
                        <p>Name: {asyncData.name}</p>
                        <p>Set: {asyncData.setName}</p>
                        <p>Set Number: {asyncData.number}</p>
                        <label>
                            Owned: 
                            <input type="checkbox" defaultChecked={asyncData.owned} onChange={this.handleOwnedChange}/>
                        </label>
                        <br />
                        <br />
                        <label>Location: </label>
                        <select defaultValue={asyncData.location} onChange={this.handleLocationChange}>
                            {config.locations.map(loc => {
                                return <option key={loc} value={loc}>{loc}</option>
                            })}
                        </select>
                        <br />
                        <br />
                        <label>
                            Notes: 
                            <textarea rows="4" cols="20" deafultvalue={asyncData.notes} onChange={this.handleNotesChange}/>
                        </label>
                        <br />
                        <br />
                        <button className="button"  onClick={this.handleSave}>Save</button>
                    </div>
                </div>
            )
        }
    }
}