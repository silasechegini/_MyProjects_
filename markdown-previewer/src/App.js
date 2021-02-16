import { Provider, connect } from 'react-redux';
import { createStore} from 'redux';
import React from 'react';
import './App.css';
import Markdown from './markdown-previewer'
import Editor from './Editor';
import Preview from './preview';


//declare constants here
const INPUT = 'INPUT';
let placeholder = `# This is a Markdown previewer!

## enter github style markdown 
### And receive html output

\`\`\`
// this is a function:

function square(number) {
  return number * number;
}
\`\`\`
  
**bold** text
_italic_ text
**_both!_**
~~crossed out~~.

[link](https://www.freecodecamp.com)
> Block Quotes!


- \`<ul></ul>\`
  - with bullets.
     - indented.


1. \`<ol></ol>\`
1. once started  
1. use whatever 
- you
* want

embedded images:

![CodePen Logo](https://blog.codepen.io/wp-content/uploads/2012/06/Button-Fill-Black-Large.png)
`;

//make an action creator here
const takeInput = (userText) =>{
  return({
    type: INPUT,
    userText: userText
  })
}

//make a reducer that takes a state and an action
const inputReducer = (state = placeholder, action) => {
  switch (action.type){
    case INPUT:
      return action.userText;
    default:
      return state;
  }
}

const store = createStore(inputReducer);

const Connect = connect;
const Provide = Provider;



class App extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.submitNewText(event);
  }

  

  render(){
    console.log("App props : ", this.props)
    // console.log("store is: ", store.getState)
    return (
      <div className="App row">
        <Markdown />
        <Editor  userText={this.props.userText} handleChange={this.handleChange}/>
        <Preview  userText={this.props.userText}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {userText: state};
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewText: (userText) => {
      dispatch(takeInput(userText));
    }
  };
};

const Container = Connect(mapStateToProps, mapDispatchToProps)(App)

class AppWrapper extends React.Component {
  render(){
    return(
      <Provide store={store}>
        <Container />
      </Provide>
    )
  }
}

export default AppWrapper;
