import React, { Component } from 'react';


export default class Clock extends React.Component {
    constructor(props){
      super(props);
      this.state = {currentCount: 10}
    }
    timer() {
      this.setState({
        currentCount: this.state.currentCount - 1
      })
      if(this.state.currentCount < 1) { 
        clearInterval(this.intervalId);
      }
    }
    componentDidMount() {
      this.intervalId = setInterval(this.timer.bind(this), 1000);
    }
    componentWillUnmount(){
      clearInterval(this.intervalId);
    }
    render() {
      return(
        <div>{this.state.currentCount}</div>
      );
    }
  }



  