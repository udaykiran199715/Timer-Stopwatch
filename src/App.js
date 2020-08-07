import React from 'react';
// import styles from './App.module.css';
// import Mount from './components/Practice/Mount'
// import Timer from './components/Clock/Timer'
// }


let hours = 0
let minutes = 0
let seconds = 0
let total = 0


// let sec =0, min = 0, hr = 0
class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      backgroundColor1: 'lightskyblue',
      backgroundColor2: '',
      stopwatch: 0,
      timer: 0,
      stopwatchFlag: false,
      TimeStopFlag: true,
      StartStopFlagTimer: true,
      StartStopFlagStopwatch:true,
      timeFlag: false,
      inputFlag: false,
      backgroundColorTimer: "green",
      backgroundColorStopwatch:"green"

    }
  }


  componentDidMount() {

    this.handleChange = (e) => {

      if (e.target.name === 'hour') {
        hours = e.target.value
      }
      if (e.target.name === 'min') {
        minutes = e.target.value
      }
      if (e.target.name === 'sec') {
        seconds = e.target.value
      }
      this.setState({ inputFlag: true })
      // console.log(hr,min,sec)
    }

    this.handleStartStopStopwatch = (e) => {

      //  if (!this.state.TimeStopFlag) {
      if (!this.state.stopwatchFlag) {
        this.setState({ stopwatchFlag: true, StartStopFlagStopwatch: false, backgroundColorStopwatch: 'red' })
        // let startTime = Date.now() - this.state.stopwatch
        this.interval = setInterval(() => {
          // this.setState({ stopwatch: Date.now() - startTime })
          this.setState({stopwatch: this.state.stopwatch + 10})

        }, 10)
      } else {
        clearInterval(this.interval)
        this.setState({ stopwatchFlag: false, StartStopFlagStopwatch: true, backgroundColorStopwatch: 'green' })
      }
      // } else {

      //   if (!this.state.timeFlag) {
      //     if (this.state.inputFlag) {
      //       total = Number(hours * 3600) + Number(minutes * 60) + Number(seconds)
      //       // console.log(total)
      //       this.setState({ inputFlag: false, timer: total })
      //     }

      //     this.setState({ StartStopflag: false, timeFlag: true , backgroundColor:'red'})
      //     this.timerInterval = setInterval(() => {
      //       this.setState({ timer: this.state.timer - 1 })
      //     }, 1000)
      //   } else {
      //     clearInterval(this.timerInterval)
      //     this.setState({ timeFlag: false, StartStopflag: true , backgroundColor:"green"})
      //   }
      // }
    }

    this.handleStartStopTimer = () => {
      if (!this.state.timeFlag) {
        if (this.state.inputFlag) {
          total = Number(hours * 3600) + Number(minutes * 60) + Number(seconds)
          // console.log(total)
          this.setState({ inputFlag: false, timer: total })
        }

        this.setState({ StartStopFlagTimer: false, timeFlag: true, backgroundColorTimer: 'red' })
        this.timerInterval = setInterval(() => {
          this.setState({ timer: this.state.timer - 1 })
        }, 1000)
      } else {
        clearInterval(this.timerInterval)
        this.setState({ timeFlag: false, StartStopFlagTimer: true, backgroundColorTimer: "green" })
      }
    }


    this.handleResetTimer = () => {
      clearInterval( this.timerInterval)
      this.setState({  StartStopFlagTimer: true, timer: 0 })
    }
    this.handleResetStopwatch= () => {
      clearInterval(this.interval)
      this.setState({StartStopFlagStopwatch: true, stopwatch: 0})
    }

    this.handleDisplay = (e) => {
      //if (e.target.textContent === 'Timer') {
        if (!this.state.TimeStopFlag) {
          this.setState({ TimeStopFlag: true, backgroundColor1: ' lightskyblue', backgroundColor2: '', })
        } else {
          this.setState({ TimeStopFlag: false, backgroundColor1: '', backgroundColor2: 'lightgray' })
        }
      }

   // }

  }

  componentWillUnmount() {
    clearInterval(this.interval, this.timerInterval)
    console.log("componentWillUnmount called")
  }

  changeStopwatch = (x) => {

    // let hour = Math.floor(x / (3600 * 1000))
    // let min = Math.floor((x / (60 * 1000)) % 60)
    // let sec = Math.floor((x / 1000) % 60)
    // let millisec = Math.floor(x / 10) % 100
    // // if(millisec ==)

    // return `${hour} : ${min} : ${sec} : ${millisec}`


    // const {stopwatch} = this.state
    let ms,sec,min,hour
    ms = Math.floor((x / 10) % 100);
    sec = Math.floor((x / 1000) % 60);
    min = Math.floor((x / (60 * 1000)) % 60);
    hour = Math.floor((x / (60 * 60 * 1000)) % 24);
    // console.log(sec, min, hour);
    return `${hour < 10 ? "0" + hour : hour} : ${
      min < 10 ? "0" + min : min
    } : ${sec < 10 ? "0" + sec : sec} : ${ms < 10 ? "0" + ms : ms}`

  }

  changeTimer = (t) => {
    let { timer } = this.state
    if (this.state.timer <= 0) {
      clearInterval(this.timerInterval)
      return ''
    } else {
      // console.log(timer)
      let hr = Math.floor(timer / 3600)
      let min = Math.floor(timer / 60) - Math.floor(timer / 3600) * 60
      let sec = timer % 60

      return `${hr} : ${min} : ${sec}`

    }
  }

  render() {
    // console.log("this.state.name")
    return (

      <div>

        {/* {this.state.show && <Mount /> */}

        {/* <button onClick={this.toggle}>
          {this.state.show?"HIDE":"SHOW"}
        </button> */}

        <div style={{ margin: "30px 0px" }}>

          <span onClick={(e) => { this.handleDisplay(e) }} style={{ border: "1px solid black" }} style={{ border: "1px solid black", backgroundColor: this.state.backgroundColor1 }}>Timer</span>
          <span style={{ border: "1px solid black" }} onClick={(e) => { this.handleDisplay(e) }} style={{ border: "1px solid black", backgroundColor: this.state.backgroundColor2 }}>Stopwatch</span>
        </div>
        <div>
          {this.state.TimeStopFlag
            ? <div><input name="hour" type='number' value={this.state.value} onChange={(e) => this.handleChange(e)} placeholder="hh" />
              <input name='min' type='number' value={this.state.value} onChange={(e) => this.handleChange(e)} placeholder="mm" />
              <input name='sec' type='number' value={this.state.value} onChange={(e) => this.handleChange(e)} placeholder="ss" />
              <h1>{this.changeTimer(this.state.timer)}</h1>
            </div>
            : <h1>{this.changeStopwatch(this.state.stopwatch)}</h1>}


        </div>
        {this.state.TimeStopFlag ? <div>
          {/* {console.log(this.state.StartStopflag)} */}
          <button style={{ marginRight: "20px", backgroundColor: this.state.backgroundColorTimer, color: "white" }} onClick={(e) => { this.handleStartStopTimer(e) }}>
            {this.state.StartStopFlagTimer ? "Start" : "Stop"}
          </button>
          <button style={{ backgroundColor: "orange" }} onClick={() => { this.handleResetTimer() }}>Reset</button>
        </div>
          : <div>
            {/* {console.log(this.state.StartStopflag)} */}
            <button style={{ marginRight: "20px", backgroundColor: this.state.backgroundColorStopwatch, color: "white" }} onClick={(e) => { this.handleStartStopStopwatch(e) }}>
              {this.state.StartStopFlagStopwatch ? "Start" : "Stop"}
            </button>
            <button style={{ backgroundColor: "orange" }} onClick={() => { this.handleResetStopwatch() }}>Reset</button>
          </div>
        }


        {/* <Timer /> */}

      </div>

    )
  }
}

export default App