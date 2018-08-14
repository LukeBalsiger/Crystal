import React from 'react'
import CrystalNavbar from './../../Nav/Nav'
import SetChild from './../SetChild/SetChild'
import './SetParent.css'
import data from './../../../data/UIData'

export default class SetParent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            set: this.props.match.params.id,
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
        var newSet = event.target.value
        this.props.history.push('/sets/' + newSet)
        this.setState({
            set:newSet
        })
    }

    render() {
        var cmbxItems = data.sets.map((set) => {
            return <option key={set} value={`${set}`}>{set}</option>
        })

        return (
            <div>
                <CrystalNavbar />
                <br />
                <div className="SetData-form-block">
                    <form>
                        <label>Select the Set you wish to see card information for:   </label>
                        <select className="SetData-select" defaultValue={this.state.set} onChange={this.handleChange}>
                            {cmbxItems}
                        </select>
                        <br />
                        <input type="checkbox" value={this.state.showImage} onChange={this.handleImageCheck}/>
                        <label>Show images</label>
                    </form>
                </div>
                <br />
                <SetChild set={this.state.set} showImage={this.state.showImage}/>
            </div>
        )
    }
}