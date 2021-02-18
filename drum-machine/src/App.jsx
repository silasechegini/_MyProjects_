import './App.css';
import React from 'react';
import $ from 'jquery';
import Key from './DrumPad';

//sound bank one - for the mixer keys
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
    id: "Kick-n-Hat",
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

//sound bank two - for the mixer keys
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

const switchOff = {
  fontFamily: "Mogra",
  color: 'white',
  width: '50%', 
  height: '100%',
  backgroundColor: 'red', 
  // float: 'right',
  border: 'none',
  outline: 'none',
}
const switchOn = {
  fontFamily: 'Mogra',
  color: 'white',
  width: '50%', 
  height: '100%',
  backgroundColor: '#3353EA', 
  float: 'right',
  border: 'none',
  outline: 'none',
}

// $(() =>{
//   $("#pwr").on("click", ()=>{
//     $("#pwr").toggleClass("'" + switchOff + "'");
//     $("#pwr").toggleClass("'" + switchOn + "'");
//   });
// });

$(() => {
  $("#bank").on("click", ()=>{
    $("#bank").toggleClass("float-left");
    $("#bank").toggleClass("float-right");
  });
});

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      notes: soundBankOne,
      display: '',
      power: false,
      bank: 0,
      sliderVal: 0.5,
      powerSwitch: switchOff
    }
    // this.activatePad = this.activatePad.bind(this);
    // this.playSound = this.playSound.bind(this);
    this.handlePower = this.handlePower.bind(this);
    this.adjustVolume = this.adjustVolume.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
    this.setDisplay = this.setDisplay.bind(this);
    this.handleBank = this.handleBank.bind(this);
  }

  componentDidMount(){
    $(() => {
      $("#drum-machine").parents().addClass('bg-secondary');
    })
  }
  
  handlePower(){
    if(!this.state.power){
      this.setState({
        power: !this.state.power,
        display: 'Powered On',
        sliderVal: 0.5,
        powerSwitch: switchOn
      })
      setTimeout(() => this.clearDisplay(), 4000);
    }else if(this.state.power){
      this.setState({
        power: !this.state.power,
        display: 'Powering down',
        sliderVal: 0,
        powerSwitch: switchOff
      })
      setTimeout(() => this.clearDisplay(), 4000);
    }
  }
  
  adjustVolume(e) {
    if (this.state.power) {
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

  setDisplay(display){
    this.setState({
      display: display
    })
  }
  
  handleBank(){
    if(this.state.power){
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
  }
  
  render(){
    {const clips = [].slice.call(document.getElementsByClassName('clip'));
    clips.forEach(sound => {
      sound.volume = this.state.sliderVal;
    });}
    return(
      <div id="drum-machine" className="container mx-auto p-5">
        <div className="row">
          <div className="keyscol col col-sm-6">
            <div className="row mx-auto">
              {this.state.notes.map(key => {return <Key 
              note={key} 
              key={key.id} 
              power={this.state.power}
              display={this.state.display}
              setDisplay={this.setDisplay}
              clearDisplay={this.clearDisplay}
              />})}
            </div>
          </div>
          <div className="col col-sm-6 ">
            <p className="labels">Power</p>
            <div className="row p-1">
              <div className="col col-sm-2 mx-auto p-0 bg-dark">
                <input type="button" value={this.state.power? "ON" : "OFF"} style={this.state.powerSwitch} id="pwr" onClick={this.handlePower}></input>
              </div>
            </div >
              <p id="display" className="p-1">{this.state.display}</p>
            <div >
            </div>
            <div className="p-5 text-center">
              <label className="labels">Volume</label>
              <input type="range" className="form-range" min="0" max="1" step='0.01' id="volume" value={this.state.sliderVal} onChange={this.adjustVolume} />
            </div>
            <p className="labels">Bank</p>
            <div className="row ">
              <div className="col col-sm-2 border border-dark mx-auto p-0 bg-dark">
                <input type="button" className="float-right" style={switchOn} id="bank" onClick={this.handleBank}></input>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
