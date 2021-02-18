import './App.css';
import React from 'react';
import $ from 'jquery';

const soundBankOne = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

const soundBankTwo = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];

$(document).ready(() =>{
  $("#pwr").click(()=>{
    $("#pwr").toggleClass("btn-primary float-left");
    $("#pwr").toggleClass("btn-danger float-right");
  });
});

$(document).ready(() =>{
  $("#bank").click(()=>{
    $("#bank").toggleClass("float-left");
    $("#bank").toggleClass("float-right");
  });
});

class Key extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  handleKeyPress(e) {
    if (e.keyCode === this.props.note.keyCode) {
      this.handleClick();
    }
  }
  
  handleClick(){
    // console.log("at handle click: ", this.props)
    this.props.handleClick(this.props.note);
  }
  
  render(){
    return(
      <div className="m-1">
        <button className="keys btn btn-secondary drum-pad" id={this.props.note.id} onClick={this.handleClick}>
          <audio
            className='clip'
            id={this.props.note.keyTrigger}
            src={this.props.note.url}
          />{this.props.note.keyTrigger}
        </button>
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      notes: soundBankOne,
      display: '',
      power: 'OFF',
      bank: 0,
      sliderVal: 0.5
    }
    this.playSound = this.playSound.bind(this);
    this.handlePower = this.handlePower.bind(this);
    this.adjustVolume = this.adjustVolume.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
    this.handleBank = this.handleBank.bind(this);
  }
  
  handlePower(){
    if(this.state.power === 'OFF'){
      this.setState({
        power: 'ON',
        display: 'Powered On',
        sliderVal: 0.5
      })
      setTimeout(() => this.clearDisplay(), 4000);
    }else if(this.state.power === 'ON'){
      this.setState({
        power: 'OFF',
        display: 'Powering down',
        sliderVal: 0
      })
      setTimeout(() => this.clearDisplay(), 4000);
    }
  }
  
  playSound(event){
    if(this.state.power === 'ON'){
      let sound = document.getElementById(event.keyTrigger);
      sound.currentTime = 0;
      sound.play();
      this.setState({
        display: event.id
      })
      setTimeout(() => this.clearDisplay(), 3000);
    }
    // this.activatePad();
    // setTimeout(() => this.activatePad(), 100);
    // this.props.updateDisplay(this.props.clipId.replace(/-/g, ' '));
  }
  
  adjustVolume(e) {
    if (this.state.power === 'ON') {
      this.setState({
        sliderVal: e.target.value,
        display: 'Volume: ' + Math.round(e.target.value * 100)
      });
      setTimeout(() => this.clearDisplay(), 3000);
    }
  }
  
  clearDisplay(){
    this.setState({
      display: ' '
    })
  }
  
  handleBank(){
    if(this.state.notes === soundBankOne){
      this.setState({
        notes: soundBankTwo,
        display:'Smooth Piano Kit'
      })
    }else{
      this.setState({
        notes: soundBankOne,
        display: 'Heater Kit'
      })
    }
  }
  
  render(){
    {const clips = [].slice.call(document.getElementsByClassName('clip'));
    clips.forEach(sound => {
      sound.volume = this.state.sliderVal;
    });}
    return(
      <div id="drum-machine" className="container mx-auto w-50 p-5 border border-warning mt-5" style={{"backgroundColor":"#C6C8CA", "":""}}>
        <div className="row">
          <div className="keyscol col col-sm-6 ">
            <div className="row">
              {this.state.notes.map(key => {return <Key note={key} handleClick={this.playSound}/>})}
            </div>
          </div>
          <div className="col col-sm-6 ">
            <p style={{"fontFamily":"cursive", "fontWeight":"bold", "textAlign":"center"}}>Power</p>
            <div className="row p-1">
              <div className="col col-sm-2 border border-dark mx-auto p-0 bg-dark">
                <input type="button" value={this.state.power} className="col col-sm-6 btn btn-sm btn-danger float-right" id="pwr" onClick={this.handlePower}></input>
              </div>
            </div >
              <p id="display" className="p-1">{this.state.display}</p>
            <div >
            </div>
            <div className="p-5 text-center">
              <label for="volume">Volume</label>
              <input type="range" class="form-range" min="0" max="1" step='0.01' id="volume" value={this.state.sliderVal} onChange={this.adjustVolume} />
            </div>
            <p style={{"fontFamily":"cursive", "fontWeight":"bold", "textAlign":"center"}}>Bank</p>
            <div className="row ">
              <div className="col col-sm-2 border border-dark mx-auto p-0 bg-dark">
                <input type="button" className="col col-sm-6 btn btn-sm btn-primary float-left" id="bank" onClick={this.handleBank}></input>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
