import React from 'react'
import CrystalNavbar from './../Nav/Nav'
import './SetData.css'
import data from './../../data/UIData'
import pokemontcgsdk from 'pokemontcgsdk'
import helper from './SetDataHelper'

export default class SetData extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      value: "base1",
      cardNameList: ["Please Wait..."],
      urlList: []
    }

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    pokemontcgsdk.card.where({setCode: this.state.value})
        .then(result =>  {
            console.log(result)
          var listCards = []
          var listUrls = []
          for(var i = 0; i < result.length; i++) {
              listCards.push(result[i].name)
              listUrls.push(result[i].imageUrl)
          }
          this.setState({
            cardNameList: listCards,
            urlList: listUrls
          })
    });
  }

  handleChange(event) {
    var selectedSet = event.target.value
    var selectedSetTranslated = helper.getSetCode(selectedSet)
    pokemontcgsdk.card.where({setCode: selectedSetTranslated})
      .then(result =>  {
        var listCards = []
          var listUrls = []
        for(var i = 0; i < result.length; i++) {
          listCards.push(result[i].name)
          listUrls.push(result[i].imageUrl)
        }
        this.setState({
          value: selectedSet,
          cardNameList: listCards,
          urlList: listUrls
        })
      })
  }

  render() {
    var cmbxItems = data.sets.map((set) => {
        if(set === "Base") {
            return <option key={set} selected value={`${set}`}>{set}</option>
        }
        return <option key={set} value={`${set}`}>{set}</option>
    })

    var urlLinkList = this.state.urlList.map(url => {
        return url
    })

    var allCardsForSelected = this.state.cardNameList.map((card, index) => {
      return <a href={urlLinkList[index]} key={urlLinkList[index] + index}><li key={card + index}>{card}</li></a>
    })

    var allUrlsForSelected = this.state.urlList.map((url, index) => {
      return <a href={url} key={url + index}><li key={url + index}>{url}</li></a>
    })

    return (
      <div>
        <CrystalNavbar />
        <div className="SetData-component">
          <br />
          <div className="SetData-form-block">
            <form>
              <label>Select the Set you wish to see card information for:   </label>
              <select className="SetData-select" value={this.state.value} onChange={this.handleChange}>
                  {cmbxItems}
              </select>
            </form>
          </div>
          <div className="SetData-display-block">
            <div className="SetData-card-list-display">
              <h4 className="SetData-h4">Set has these cards:</h4>
              <ul className="SetData-ul">
                {allCardsForSelected}
              </ul>
            </div>
            <div className="SetData-url-list-display">
              <h4 className="SetData-h4">Image urls:</h4>
              <ul className="SetData-ul">
                {allUrlsForSelected}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}