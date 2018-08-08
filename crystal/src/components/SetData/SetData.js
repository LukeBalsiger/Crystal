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
        showImage: false,
        showDataToCopy: false,
        value: "base1",
        cardNameList: ["Please Wait..."],
        urlList: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleImageCheck = this.handleImageCheck.bind(this);
    this.handleDataCheck = this.handleDataCheck.bind(this);
  }

  componentDidMount() {
    pokemontcgsdk.card.where({setCode: this.state.value})
        .then(result =>  {
            var listCards = []
            var listUrls = []
            for(var i = 0; i < result.length; i++) {
                if(result[i].name.length === 0) { result[i].set = 'N/A'}
                if(result[i].imageUrl.length === 0) { result[i].imageUrl = 'N/A'}
                listCards.push(result[i].name)
                listUrls.push(result[i].imageUrl)
            }
            this.setState({
                cardNameList: listCards,
                urlList: listUrls
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
    var selectedSet = event.target.value
    var selectedSetTranslated = helper.getSetCode(selectedSet)
    pokemontcgsdk.card.where({setCode: selectedSetTranslated})
        .then(result =>  {
            var listCards = []
            var listUrls = []
            for(var i = 0; i < result.length; i++) {
                if(result[i].name.length === 0) { result[i].set = 'N/A'}
                if(result[i].imageUrl.length === 0) { result[i].imageUrl = 'N/A'}
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
      return <li key={card + index}>{card}</li>
    })

    var allUrlsForSelected = this.state.urlList.map((url, index) => {
      return <li key={url + index}>{url}</li>
    })

    var tableRowsData = () => {
        var multiArray = new Array(this.state.cardNameList.length);
        for (var i = 0; i < this.state.cardNameList.length; i++) {
          multiArray[i] = new Array(2);
        }
        for(var j = 0; j < this.state.cardNameList.length; j++) {
          multiArray[j][0] = this.state.cardNameList[j]
          multiArray[j][1] = this.state.urlList[j]
        }
        return multiArray
      }
  
      var tableRows = tableRowsData().map((tableRow, index) => {
          var imageColumn = <td className="SetData-table-data"><a href={tableRow[1]} key={tableRow[1] + index}>Link</a></td>
          if(this.state.showImage) { imageColumn = <td className="SetData-table-data"><img src={tableRow[1]} alt="Card"/></td> }
          return (
            <tr key={index} className="SetData-table-row">
              <td className="SetData-table-data">{tableRow[0]}</td>
              {imageColumn}
              </tr>
          )
      })

      var dataToCopyBlock = () => {
        if(this.state.showDataToCopy) {
          return (
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
          )
        }
      }

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
                <br />
                <input type="checkbox" value={this.state.showImage} onChange={this.handleImageCheck}/>
                <label>Show images</label>
                <input type="checkbox" value={this.state.showDataToCopy} onChange={this.handleDataCheck}/>
                <label>Show more data</label>
                </form>
            </div>
            <div className="SetData-table-display">
                <table className="SetData-table">
                <thead className="SetData-table-head">
                    <tr className="SetData-table-row">
                    <th className="SetData-table-head-column">Card</th>
                    <th className="SetData-table-head-column">Image</th>
                    </tr>
                </thead>
                <tbody className="SetData-table-body">
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