import React, { Component } from 'react';
import dataJsoncontrolled from '../JSON/layer.js';
import { SketchField } from 'react-sketch';

let arr = [];

arr.push(dataJsoncontrolled);

export default class SketchFieldDemo extends React.Component {


    render() {
      //make a copy of arr to store for later --> 
      let a = arr.slice(0);
      return (
  
        <SketchField width='800px'
          height='700px'
          tool={this.props.types}
          lineColor={`rgba(${this.props.color.r},${this.props.color.g},${this.props.color.b},${this.props.color.a})`}
          lineWidth={this.props.size}
          backgroundColor={!this.props.clearBoolean ? 'transparent' : `rgba(${this.props.color.r},${this.props.color.g},${this.props.color.b},100)`}
          undoSteps={2}
          fillColor={this.props.transparent ? "transparent" : `rgba(${this.props.color.r},${this.props.color.g},${this.props.color.b},100)`}
          style={{ position: "relative", margin: "auto", top: "20px" }}
          value={this.props.clearBoolean ? a : null}
        />
      )
    }
  }