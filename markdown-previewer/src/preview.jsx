import React from 'react';
import marked from 'marked';

class Preview extends React.Component {
    constructor(props){
        super(props);
        this.getCurrent = this.getCurrent.bind(this);
    }

    getCurrent(props){
        console.log(this.props.getState())
        this.props.getState()
    }
    
    render(){
        //initalize marked.js
        marked.setOptions({
            breaks: true
        });
        console.log("Preview props is: ", this.props)
        
        return(
            <div className="col-6 pl-0">
                <div className="bg-white p-3 pl-5 ml-0"><span style={{"fontSize":"30px", "fontWeight":"bold"}}>Preview</span></div>
                <div className="well w-100 h-100 text-justify" style={{"backgroundColor":"#ECE2E0"}} dangerouslySetInnerHTML={{ __html: marked(this.props.userText)}}></div>
                {/*dangerouslySetInnerHTML={{ __html: marked(this.props.userText)}}  dangerouslySetInnerHTML={{ __html: marked(this.state.markdown) }} */}
            </div>
        )
    }
}

export default Preview