import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './sketch.css';
import {SketchField, Tools} from 'react-sketch';
import { SketchPicker } from 'react-color'
import reactCSS from 'reactcss'
import ToolBar from './Components/ToolBar/index.js';
import dataJsoncontrolled from './Components/JSON/layer.js';
import words from './Components/JSON/words/index.js';

let arr = [];

arr.push(dataJsoncontrolled);

let b;

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      penColor: { r : 0, g : 0, b : 0, a : 100},
      displayColorPicker: false,
      isHidden : true,
      penSize : 10,
      toolType : "pencil",
      toggleTransparent : true,
      clearCanvas : 'transparent',
      shouldClear : false
    }
  }

  toggleHidden = () => {
    this.setState({
      isHidden: !this.state.isHidden
    })
  };

  //display color picker
  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker, shouldClear : false })
  };
  //hide color picker
  handleClose = () => {
    this.setState({ displayColorPicker: false, shouldClear : false })
  };
  //after color is picked
  handleChangeComplete = (color) => {
    
    this.setState({ penColor: color.rgb});
  };
  //pensize handler
  handlePenSize = (penSize) => {this.setState({penSize, shouldClear : false})}
  
  //toolType handler
  handleToolType = (toolType) => { this.setState({toolType, penColor : {r : 0, g : 0, b : 0, a : 100}, shouldClear : false})} 

  //toggle transparent fill
  handleTransparent = () => { this.setState({ toggleTransparent : !this.state.toggleTransparent, shouldClear : false })}

  
  //handle clear canvas
  handleClear = () => { this.setState({ shouldClear : true })};

  //Eraser..
  handleEraser = () => {this.setState({ penColor : { r : 255, g : 255, b : 255, a : 100 }, penSize : 30, toolType : 'pencil', shouldClear : false})}


  render() {
    
    const popover = {
      position: 'absolute',
      zIndex: '2',
    }
    const cover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    }
    return (
      <div className="App">
        <ToolBar onSketchChange = {this.onSketchChange} handleTransparent={ this.handleTransparent } handleClick={this.handleClick} handlePenSize={ this.handlePenSize } handleToolType={ this.handleToolType } handleClear={this.handleClear} handleEraser={this.handleEraser}/>
        { this.state.displayColorPicker ? <div style={ popover }>
          <div style={ cover } onClick={ this.handleClose }/>
        <SketchPicker color={ this.state.penColor } onChangeComplete={ this.handleChangeComplete }/>
    </div> : null}
    <SketchFieldDemo clearBoolean={this.state.shouldClear} transparent={this.state.toggleTransparent} reset={ this.state.clearCanvas }  color={ this.state.penColor } size={ this.state.penSize } types={ this.state.toolType }/>
      </div>
    );
  }
}


class SketchFieldDemo extends React.Component {

  
  render() {
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
                      style={{position:"relative",margin:"auto",top:"20px"}}
                      value={this.props.clearBoolean ? a : null}
                      />
     )
  }
}

export default App;
