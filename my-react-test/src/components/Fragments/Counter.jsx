import React from "react";
class Counter extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            count: 0 
        };
    }

    componentDidMount() {
        this.setState({count: 1});
    }

    componentDidUpdate() {
        if(this.state.count === 10){
            this.setState({count: 0});
        }
    }
    render() {
        return (
            <div>
            <h1>{this.state.count}</h1>
            <button 
            onClick={() => this.setState({count: this.state.count + 1})} 
            className="bg-black text-white px-3"
            >
            +
            </button>
        </div>
        );
    }
}

export default Counter;