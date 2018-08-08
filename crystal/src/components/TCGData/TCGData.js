import React from 'react'
import CrystalNavbar from './../Nav/Nav'
import './TCGData.css'
import data from './../../data/UIData'
import pokemontcgsdk from 'pokemontcgsdk'

export default class TCGData extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      showImage: false,
      showDataToCopy: false,
      value: "Bulbasaur",
      setList: ["Please wait..."],
      numList: [],
      rarityList: [],
      urlList: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleImageCheck = this.handleImageCheck.bind(this);
    this.handleDataCheck = this.handleDataCheck.bind(this);
  }

  componentDidMount() {
    pokemontcgsdk.card.where({name: this.state.value})
        .then(result =>  {
          var listSet = []
          var listNum = []
          var listRarity = []
          var listUrl = []
          for(var i = 0; i < result.length; i++) {
            if(result[i].set.length === 0) { result[i].set = 'N/A'}
            if(result[i].number.length === 0) { result[i].number = 'N/A'}
            if(result[i].rarity.length === 0) { result[i].rarity = 'N/A'}
            if(result[i].imageUrl.length === 0) { result[i].imageUrl = 'N/A'}
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

  handleImageCheck(event) {
    this.setState({ showImage: !this.state.showImage })
  }

  handleDataCheck(event) {
    this.setState({ showDataToCopy: !this.state.showDataToCopy })
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
          if(result[i].set.length === 0) { result[i].set = 'N/A'}
          if(result[i].number.length === 0) { result[i].number = 'N/A'}
          if(result[i].rarity.length === 0) { result[i].rarity = 'N/A'}
          if(result[i].imageUrl.length === 0) { result[i].imageUrl = 'N/A'}
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
            return <option key={name} defaultValue={`${name}`}>{name}</option>
        }
        return <option key={name} value={`${name}`}>{name}</option>
    })

    var allSetsForSelected = this.state.setList.map((set, index) => {
      return <li key={set + index}>{set}</li>
    })

    var allNumbersForSelected = this.state.numList.map((num, index) => {
      return <li key={num + index}>{num}</li>
    })

    var allRaritiesForSelected = this.state.rarityList.map((rarity, index) => {
      return <li key={rarity + index}>{rarity}</li>
    })

    var allUrlsForSelected = this.state.urlList.map((url, index) => {
      return <li key={url + index}>{url}</li>
    })

    var tableRowsData = () => {
      var multiArray = new Array(this.state.setList.length);
      for (var i = 0; i < this.state.setList.length; i++) {
        multiArray[i] = new Array(4);
      }
      for(var j = 0; j < this.state.setList.length; j++) {
        multiArray[j][0] = this.state.setList[j]
        multiArray[j][1] = this.state.numList[j]
        multiArray[j][2] = this.state.rarityList[j]
        multiArray[j][3] = this.state.urlList[j]
      }
      return multiArray
    }

    var tableRows = tableRowsData().map((tableRow, index) => {
        var imageColumn = <td className="TCGData-table-data"><a href={tableRow[3]} key={tableRow[3] + index}>Link</a></td>
        if(this.state.showImage) { imageColumn = <td className="TCGData-table-data"><img src={tableRow[3]} alt="Card"/></td> }
        return (
          <tr key={index} className="TCGData-table-row">
            <td className="TCGData-table-data">{tableRow[0]}</td>
            <td className="TCGData-table-data">{tableRow[1]}</td>
            <td className="TCGData-table-data">{tableRow[2]}</td>
            {imageColumn}
            </tr>
        )
    })

    var dataToCopyBlock = () => {
      if(this.state.showDataToCopy) {
        return (
          <div className="TCGData-display-block">
              <div className="TCGData-set-list-display">
                <h3 className="tCGData-h3">---Data to copy---</h3>
                <h4 className="TCGData-h4">Sets</h4>
                <ul className="TCGData-ul">
                  {allSetsForSelected}
                </ul>
              </div>
              <div className="TCGData-num-list-display">
                <h4 className="TCGData-h4">Set Numbers</h4>
                <ul className="TCGData-ul">
                  {allNumbersForSelected}
                </ul>
              </div>
              <div className="TCGData-rarity-list-display">
                <h4 className="TCGData-h4">Rarities</h4>
                <ul className="TCGData-ul">
                  {allRaritiesForSelected}
                </ul>
              </div>
              <div className="TCGData-url-list-display">
                <h4 className="TCGData-h4">Image urls</h4>
                <ul className="TCGData-ul">
                  {allUrlsForSelected}
                </ul>
              </div>
            </div>
        )
      }
    }

    return (
      <div>
        <CrystalNavbar />
        <br />
        <div className="TCGData-component">
          <br />
          <div className="TCGData-form-block">
            <form>
              <label>Select the Pokemon you wish to see card information for:   </label>              
              <select className="TCGData-select" value={this.state.value} onChange={this.handleChange}>
                  {cmbxItems}
              </select>
              <br />
              <label class="switch">
                <input type="checkbox" value={this.state.showImage} onChange={this.handleImageCheck}/>
                <span class="slider round"></span>
                Show Images
              </label>
              <input type="checkbox" value={this.state.showDataToCopy} onChange={this.handleDataCheck}/>
              <label>Show more data</label>
            </form>
          </div>
          <br />
          <div className="TCGData-table-display">
            <table className="TCGData-table">
              <thead className="TCGData-table-head">
                <tr className="TCGData-table-row">
                  <th className="TCGData-table-head-column">Set</th>
                  <th className="TCGData-table-head-column">Number</th> 
                  <th className="TCGData-table-head-column">Rarity</th>
                  <th className="TCGData-table-head-column">Image</th>
                </tr>
              </thead>
              <tbody className="TCGData-table-body">
                {tableRows}
              </tbody>
            </table>
          </div>
          <div>
            {dataToCopyBlock()}
          </div>
        </div>
      </div>
    )
  }
}