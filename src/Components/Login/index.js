import React, { Component } from 'react';




export default class Login extends React.Component{


    render(){
        return(
            <div style={{width:"100%",height : "100%"}}>
            <input type="text" placeholder="Enter a username.."></input>
            <button onClick={this.props.handleLogin}>Enter!</button>
            </div>
        )
    }

}