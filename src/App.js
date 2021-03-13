import React from "react"
import './App.css';

class App extends React.Component {

  state = {
    gfastest:0,
    gfast:0,
    gaverage:0,
    isloading:false
  }

  clickHandler = ()=>{
    this.setState({ isloading:true })
    fetch("https://ethgasstation.info/api/ethgasAPI.json?api-key=7994d7838528df842e2667dfdc3e1f53480a05f5b21a245433939eed40a7")
      .then(response => response.json())
        .then(data => {
          this.setState({
            gfastest:(data.fastest)/10,
            gfast:(data.fast)/10,
            gaverage:(data.average)/10,
            isloading:false
          })
        })
  }

  clickTest = ()=>{
    //https://www.gasnow.org/api/v3/gas/data?utm_source=web
    //https://ethgas.watch/.netlify/functions/gas this does't let you use data
    this.setState({ isloading:true })
    fetch("https://www.gasnow.org/api/v3/gas/data?utm_source=web")
      .then(response => response.json())
        .then(data => {
          console.log(data)
        })
        this.setState({ isloading:false })
  }

  render(){
    return (
      <div className="App">
        <h1>GasTrack</h1>
        <div className="prices">
          <div className="fastest">
            <h2>Fastest</h2>
            <h3>{this.state.gfastest} GWei</h3>
            <p>under 30 sec</p>
          </div>
          <div className="fast">
            <h2>Fast</h2>
            <h3>{this.state.gfast} GWei</h3>
            <p>under 2 minute</p>
          </div>
          <div className="average">
            <h2>Average</h2>
            <h3>{this.state.gaverage} GWei</h3>
            <p>under 5 minute</p>
          </div>
        </div>
        {this.state.isloading?<h1>...Loading data</h1>:<h1>latest gas prices</h1>}
        <button onClick={this.clickHandler}>Get prices</button>
        <button onClick={this.clickTest}>test</button>
      </div>
    );
  }
}

export default App;
