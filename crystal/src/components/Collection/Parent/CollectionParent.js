import React from 'react'
import CrystalNavbar from '../../Nav/Nav'
import CollectionChild from './../Child/CollectionChild'
import './CollectionParent.css'
import config from './../../../config/config'

export default class CollectionParent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filterLocation: "Main Binder 1",
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
            filterLocation: event.target.value
        })
    }

    render() {
        var cmbxItems = config.locations.map((location) => {
            return <option key={location} value={`${location}`}>{location}</option>
        })

        return (
            <div>
                <CrystalNavbar />
                <br />
                <div className="CollectionData-form-block">
                    <form>
                        <label>Select a storage location:   </label>
                        <select className="CollectionData-select" value={this.state.filterLocation} onChange={this.handleChange}>
                            {cmbxItems}
                        </select>
                        <br />
                        <input type="checkbox" value={this.state.showImage} onChange={this.handleImageCheck}/>
                        <label>Show images</label>
                    </form>
                </div>
                <br />
                <CollectionChild location={this.state.filterLocation} showImage={this.state.showImage}/>
            </div>
        )
    }
}