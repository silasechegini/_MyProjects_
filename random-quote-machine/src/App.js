/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import './App.css';
import React from 'react';
import $ from 'jquery';
import './index.css';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      quote: 'The heights by great men reached and kept were not attained by sudden flight, but they, while their companions slept, were toiling upward in the night.',
      author: 'Henry Wadsworth Longfellow',
      color: "#" + Math.floor(Math.random()*16777215).toString(16)
    }
    this.handleClick = this.handleClick.bind(this)
  }
 
  componentDidMount() {
    let myColor = this.state.color
    $(document).ready(function(){
      $("#quote-box").parents().css("backgroundColor", myColor)
      $("#new-quote").css("backgroundColor", myColor)
      $("#tweet-quote").css("backgroundColor", myColor)
      $("#tumblr-quote").css("backgroundColor", myColor)
      $("#text").css("color", myColor)
      $("#author").css("color", myColor)
    })
  }
  
  handleClick(){
    this.setState({
      color: "#" + Math.floor(Math.random()*16777215).toString(16)
    })
    let myColor = this.state.color
    $(document).ready(()=>{
      $("#quote-box").parents().css("backgroundColor", myColor)
      $("#new-quote").css("backgroundColor", myColor)
      $("#tweet-quote").css("backgroundColor", myColor)
      $("#tumblr-quote").css("backgroundColor", myColor)
      $("#text").css("color", myColor)
      $("#author").css("color", myColor)
    })
    fetch("https://type.fit/api/quotes")
      .then(response => {
      return response.json();
    }).then( data =>{
      let i = Math.floor(Math.random() * data.length);
      let quote = data[i].text;
      let author = "Unknown";
      data[i].author? author = data[i].author : author = "Unknown";
      console.log(quote, author)
      this.setState({
        quote: quote,
        author: author
      })
    });
  };
  
  render(){
    return(
      <div class="row align-items-center " style={{"alignContent":"center"}}>
        <div id="quote-box" class="card p-3 bg-white mx-auto" style={{"marginTop":"15%", "width":"600px"}}>
        <div style={{"padding":"30px"}}>
          <h2 id="text"><i class="fas fa-quote-left"></i> {this.state.quote}</h2>
          <p style={{"paddingLeft":"50%"}} id="author">-{this.state.author}</p>
        </div>
        <div class="row mx-2">
          <div class="col-sm-1">
            <a target="_blank" rel='noreferrer' href="https://twitter.com/intent/tweet" class="fa fa-twitter" id="tweet-quote"></a>
          </div>
          <div class="col-sm-1">
            <a href="#" class="fa fa-tumblr" id="tumblr-quote"></a>
          </div>
          <div class="col-sm-7"></div>
          <div class="col-sm-3">
            <button class="btn btn-info btn-outline-light" id="new-quote"
              onClick={this.handleClick}>New quote</button>
          </div>
        </div>
      </div>
      </div>
      
    )
  }
}

export default App;
