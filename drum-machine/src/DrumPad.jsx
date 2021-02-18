import './App.css';
import React from 'react';

const activeStyle = {
    outline: 'none',
    border: 'none',
    fontSize: '24px',
    width: '110px',
    height: '90px',
    fontFamily: "Mogra",
    borderRadius: '10px',
    backgroundColor: 'orange',
    boxShadow: '5px 5px 5px black',
    marginLeft: '5px',
    marginBottom: '5px',
    transform: 'translateY(4px)'
};
  
const inactiveStyle = {
    outline: 'none',
    border: 'none',
    fontSize: '24px',
    width: '110px',
    height: '90px',
    fontFamily: "Mogra",
    borderRadius: '10px',
    backgroundColor: 'grey',
    boxShadow: '5px 5px 5px black',
    marginLeft: '5px',
    marginBottom: '5px',
    transform: 'translateX(4px)'
};

class Key extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        padStyle: inactiveStyle
      }
      this.setDisplay = this.setDisplay.bind(this);
      this.handleKeyPress = this.handleKeyPress.bind(this);
      this.playSound = this.playSound.bind(this);
      this.activatePad = this.activatePad.bind(this);
      this.clearDisplay = this.clearDisplay.bind(this);
    }
    
    componentDidMount() {
      document.addEventListener('keydown', this.handleKeyPress);
    }
  
    componentWillUnmount() {
      document.removeEventListener('keydown', this.handleKeyPress);
    }
  
    handleKeyPress(e) {
      if (e.keyCode === this.props.note.keyCode) {
        this.playSound();
      }
    }
  
    playSound(){
      if(this.props.power){
        let sound = document.getElementById(this.props.note.keyTrigger);
        sound.currentTime = 0;
        sound.play();
        this.activatePad();
        this.setDisplay(this.props.note.id);
        setTimeout(() => this.activatePad(this.props.note), 100);
        setTimeout(() => this.clearDisplay(), 3000);
      }
    }
    setDisplay(display){
      this.props.setDisplay(display);
    }
  
    activatePad(e) {
      if (this.props.power) {
        if (this.state.padStyle.backgroundColor === 'orange') {
          this.setState({
            padStyle: inactiveStyle
          });
        } else {
          this.setState({
            padStyle: activeStyle
          });
        }
      }
      else {
        this.setState({
          padStyle: inactiveStyle
        });
      }
    }
    
    clearDisplay(){
      this.props.clearDisplay();
    }
    
    render(){
      return(
        <div className="m-1">
          <button style={this.state.padStyle} id={this.props.note.id} onClick={this.playSound}>
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

  export default Key;