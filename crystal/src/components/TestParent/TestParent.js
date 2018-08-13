import React from 'react'
import CrystalNavbar from '../Nav/Nav'
import TestChild from '../TestChild/TestChild'
import './TestParent.css'
import data from './../../data/UIData'

export default class TestParent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            set: "Base Set",
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
            set: event.target.value
        })
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
                <div className="SetData-form-block">
                    <form>
                        <label>Select the Set you wish to see card information for:   </label>
                        <select className="SetData-select" value={this.state.set} onChange={this.handleChange}>
                            {cmbxItems}
                        </select>
                        <br />
                        <input type="checkbox" value={this.state.showImage} onChange={this.handleImageCheck}/>
                        <label>Show images</label>
                    </form>
                </div>
                <br />
                <TestChild set={this.state.set} showImage={this.state.showImage}/>
            </div>
        )
    }
}