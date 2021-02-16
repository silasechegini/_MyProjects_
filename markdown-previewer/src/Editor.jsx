import React from 'react';

class Editor extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.props.handleChange(event.target.value);
    }

    render(){
        console.log("at editor: ", this.props)
        return(
            <div className="col-6 border border-secondary bg-light pr-0">
                <div className="bg-secondary text-white p-3 pl-5"><span style={{"fontSize":"30px", "fontWeight":"bold"}}>Editor</span></div>
                <textarea className="input w-100 h-100 col bg-dark text-light m-auto" onChange={this.handleChange} value={this.props.userText}></textarea>
                {/* value={this.props.props.userText} */}
            </div>
        )
    }
}

export default Editor