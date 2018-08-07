import React from 'react'
import CrystalNavbar from './../Nav/Nav'
import './TCGData.css'
import data from './../../data/UIData'
import pokemontcgsdk from 'pokemontcgsdk'

export default class TCGData extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      value: "Bulbasaur",
      setList: ["Please wait..."],
      numList: [],
      rarityList: [],
      urlList: []
    }

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    pokemontcgsdk.card.where({name: this.state.value})
        .then(result =>  {
          var listSet = []
          var listNum = []
          var listRarity = []
          var listUrl = []
          for(var i = 0; i < result.length; i++) {
              listSet.push(result[i].set)
              listNum.push(result[i].number)
              listRarity.push(result[i].rarity)
              listUrl.push(result[i].imageUrl)
          }
          this.setState({
            setList: listSet,
            numList: listNum,
            rarityList: listRarity,
            urlList: listUrl
          })
    });
  }

  handleChange(event) {
    var selectedName = event.target.value
    pokemontcgsdk.card.where({name: selectedName})
      .then(result =>  {
        var listSet = []
          var listNum = []
          var listRarity = []
          var listUrl = []
        for(var i = 0; i < result.length; i++) {
          listSet.push(result[i].set)
          listNum.push(result[i].number)
          listRarity.push(result[i].rarity)
          listUrl.push(result[i].imageUrl)
        }
        this.setState({
          value: selectedName,
          setList: listSet,
          numList: listNum,
          rarityList: listRarity,
          urlList: listUrl
        })
      })
  }

  render() {
    var cmbxItems = data.names.map((name) => {
        if(name === "Bulbasaur") {
            return <option key={name} selected value={`${name}`}>{name}</option>
        }
        return <option key={name} value={`${name}`}>{name}</option>
    })

    var urlLinkList = this.state.urlList.map(url => {
      return url
    })

    var allSetsForSelected = this.state.setList.map((set, index) => {
      return <li key={set + index}><a href={urlLinkList[index]} key={urlLinkList[index] + index}>{set}</a></li>
    })

    var allNumbersForSelected = this.state.numList.map((num, index) => {
      return <li key={num + index}><a href={urlLinkList[index]} key={urlLinkList[index] + index}>{num}</a></li>
    })

    var allRaritiesForSelected = this.state.rarityList.map((rarity, index) => {
      return <li key={rarity + index}><a href={urlLinkList[index]} key={urlLinkList[index] + index}>{rarity}</a></li>
    })

    var allUrlsForSelected = this.state.urlList.map((url, index) => {
      return <li key={url + index}><a href={url} key={url + index}>{url}</a></li>
    })

    return (
      <div>
        <CrystalNavbar />
        <div className="TCGData-component">
          <br />
          <div className="TCGData-form-block">
            <form>
              <label>Select the Pokemon you wish to see card information for:   </label>
              <select className="TCGData-select" value={this.state.value} onChange={this.handleChange}>
                  {cmbxItems}
              </select>
            </form>
          </div>
          <div className="TCGData-display-block">
            <div className="TCGData-set-list-display">
              <h4 className="TCGData-h4">Sets this pokemon has a card in:</h4>
              <ul className="TCGData-ul">
                {allSetsForSelected}
              </ul>
            </div>
            <div className="TCGData-num-list-display">
              <h4 className="TCGData-h4">Set Numbers:</h4>
              <ul className="TCGData-ul">
                {allNumbersForSelected}
              </ul>
            </div>
            <div className="TCGData-rarity-list-display">
              <h4 className="TCGData-h4">Rarities:</h4>
              <ul className="TCGData-ul">
                {allRaritiesForSelected}
              </ul>
            </div>
            <div className="TCGData-url-list-display">
              <h4 className="TCGData-h4">Image urls:</h4>
              <ul className="TCGData-ul">
                {allUrlsForSelected}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}