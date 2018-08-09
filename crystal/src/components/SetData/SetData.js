import React from 'react'
import CrystalNavbar from './../Nav/Nav'
import './SetData.css'
import data from './../../data/UIData'
import sets from './../../data/sets/setHelper'

export default class SetData extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
        showImage: false,
        showDataToCopy: false,
        value: "",
        cardNameList: ["Please Wait..."],
        setNumList: [],
        urlList: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleImageCheck = this.handleImageCheck.bind(this);
    this.handleDataCheck = this.handleDataCheck.bind(this);
  }

  componentDidMount() {
    var selectedSet = "Base Set"
    var listCards = []
    var listNums = []
    var listUrls = []
    var result = sets.importSet(selectedSet)
    for(var i = 0; i < result.length; i++) {
        if(result[i].name.length === 0) { result[i].set = 'N/A'}
        if(result[i].number.length === 0) { result[i].number = 'N/A'}
        if(result[i].imageUrl.length === 0) { result[i].imageUrl = 'N/A'}
        listCards.push(result[i].name)
        listNums.push(result[i].number)
        listUrls.push(result[i].imageUrl)
    }
    this.setState({
        value: selectedSet,
        cardNameList: listCards,
        setNumList: listNums,
        urlList: listUrls
    })


    
  }

  handleImageCheck(event) {
    this.setState({ showImage: !this.state.showImage })
  }

  handleDataCheck(event) {
    this.setState({ showDataToCopy: !this.state.showDataToCopy })
  }

  handleChange(event) {
    var selectedSet = event.target.value
    var listCards = []
    var listNums = []
    var listUrls = []
    var result = sets.importSet(selectedSet)
    for(var i = 0; i < result.length; i++) {
        if(result[i].name.length === 0) { result[i].set = 'N/A'}
        if(result[i].number.length === 0) { result[i].number = 'N/A'}
        if(result[i].imageUrl.length === 0) { result[i].imageUrl = 'N/A'}
        listCards.push(result[i].name)
        listNums.push(result[i].number)
        listUrls.push(result[i].imageUrl)
    }
    this.setState({
        value: selectedSet,
        cardNameList: listCards,
        setNumList: listNums,
        urlList: listUrls
    })
  }

  render() {
    var cmbxItems = data.sets.map((set) => {
        if(set === "Base") {
            return <option key={set} selected value={`${set}`}>{set}</option>
        }
        return <option key={set} value={`${set}`}>{set}</option>
    })

    var allCardsForSelected = this.state.cardNameList.map((card, index) => {
      return <li key={card + index}>{card}</li>
    })

    var allUrlsForSelected = this.state.urlList.map((url, index) => {
      return <li key={url + index}>{url}</li>
    })

    var allNumsForSelected = this.state.setNumList.map((num, index) => {
        return <li key={num + index}>{num}</li>
      })

    var tableRowsData = () => {
        var multiArray = new Array(this.state.cardNameList.length);
        for (var i = 0; i < this.state.cardNameList.length; i++) {
          multiArray[i] = new Array(3);
        }
        for(var j = 0; j < this.state.cardNameList.length; j++) {
          multiArray[j][0] = this.state.cardNameList[j]
          multiArray[j][1] = this.state.setNumList[j]
          multiArray[j][2] = this.state.urlList[j]
        }
        return multiArray
      }
  
      var tableRows = tableRowsData().map((tableRow, index) => {
          var imageColumn = <td className="SetData-table-data"><a href={tableRow[2]} key={tableRow[2] + index}>Link</a></td>
          if(this.state.showImage) { imageColumn = <td className="SetData-table-data"><img src={tableRow[2]} alt="Card"/></td> }
          return (
            <tr key={index} className="SetData-table-row">
              <td className="SetData-table-data">{tableRow[0]}</td>
              <td className="SetData-table-data">{tableRow[1]}</td>
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
                <div className="SetData-set-number-display">
                    <h4 className="SetData-h4">Set Numbers:</h4>
                    <ul className="SetData-ul">
                        {allNumsForSelected}
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
            <br />
            <div className="SetData-table-display">
                <table className="SetData-table">
                <thead className="SetData-table-head">
                    <tr className="SetData-table-row">
                    <th className="SetData-table-head-column">Card</th>
                    <th className="SetData-table-head-column">Number</th>
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