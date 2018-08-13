import React from 'react'
import CrystalNavbar from '../Nav/Nav'
import './Edit.css'

export default class Edit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id
        }
    }

    render() {

        return (
            <div>
                <CrystalNavbar />
                <p>{this.state.id}</p>
            </div>
        )
    }
}