import React, { Component } from 'react';
// import reactDom from 'react-dom';

class Counter extends Component {

    componentDidUpdate(prevProps, prevState){
        console.log('previous State: ', prevState);
        console.log('previous Props: ', prevProps);
    }
    
    //just for debugging for now
    componentWillUnmount() {
        console.log('Counter - Unmounted');
    }

    render() { 
        console.log('Counter - Rendered');
        return (
        <div>
            {this.props.children}
            <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
            <button 
                onClick = {() => this.props.onIncrement(this.props.counter)}
                className="btn btn-secondary btn-sm"> Increment
            </button>
            <button onClick={() => this.props.onDelete(this.props.counter.id)} className="btn btn-danger btn-sm m-3">Delete</button>
        </div>
        );
    }

    getBadgeClasses() {
        let classes = "badge m-2 badge-sm badge-";
        classes += this.props.counter.value === 0 ? "warning" : "primary";
        return classes;
    }

    formatCount() {
        const {value} = this.props.counter;
        return value === 0? "Zero" : value;
    }
}


 
export default Counter;