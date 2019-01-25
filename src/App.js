import React, { Component } from 'react';
import './Css/App.css';
import './Css/sketch.css';
import './Css/register.css';
import { SketchField } from 'react-sketch';
import { SketchPicker } from 'react-color'
import ToolBar from './Components/ToolBar/index.js';
import dataJsoncontrolled from './Components/JSON/layer.js';
import words from './Components/JSON/words/index.js';
import Clock from './Components/Timer';
import LoginScreen from './Components/LoginScreen';
import firebase from '../src/Components/firebase';




let arr = [];

arr.push(dataJsoncontrolled);


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      enter: false,
      penColor: { r: 0, g: 0, b: 0, a: 100 },
      displayColorPicker: false,
      isHidden: true,
      penSize: 10,
      toolType: "pencil",
      toggleTransparent: true,
      clearCanvas: 'transparent',
      shouldClear: false,
      isLoggedIn: false

    }
  }


  //toggle hidden
  toggleHidden = () => { this.setState({ isHidden: !this.state.isHidden }) };

  //display color picker
  handleClick = () => { this.setState({ displayColorPicker: !this.state.displayColorPicker, shouldClear: false }) };

  //hide color picker
  handleClose = () => { this.setState({ displayColorPicker: false, shouldClear: false }) };

  //after color is picked
  handleChangeComplete = (color) => { this.setState({ penColor: color.rgb }) };

  //pensize handler
  handlePenSize = (penSize) => { this.setState({ penSize, shouldClear: false }) }

  //toolType handler
  handleToolType = (toolType) => { this.setState({ toolType, penColor: { r: 0, g: 0, b: 0, a: 100 }, shouldClear: false }) }

  //toggle transparent fill
  handleTransparent = () => { this.setState({ toggleTransparent: !this.state.toggleTransparent, shouldClear: false }) }

  //handle clear canvas
  handleClear = () => { this.setState({ shouldClear: true }) };

  //Eraser..
  handleEraser = () => { this.setState({ penColor: { r: 255, g: 255, b: 255, a: 100 }, penSize: 30, toolType: 'pencil', shouldClear: false }) }

  switchLogin = () => { this.setState({ enter: true }) }

  //get ready to enter
  getReadyToEnter = (a) => {
    this.setState({
      isLoggedIn: a
    });
  }

  getMeOut = (e) => {
    firebase.auth().signOut().then(() => {
      console.log("logged out");
      localStorage.clear();
      
    }, function(error) {
      console.error('Sign Out Error', error);
    });
    setTimeout(() =>{
      this.setState({
        isLoggedIn : e
      })
    },500);
    
  }

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
    let childArr = [
      <ToolBar key={1} getMeOut={this.getMeOut} onSketchChange={this.onSketchChange} handleTransparent={this.handleTransparent}
        handleClick={this.handleClick} handlePenSize={this.handlePenSize} handleToolType={this.handleToolType}
        handleClear={this.handleClear} handleEraser={this.handleEraser} />,

      this.state.displayColorPicker && (
        <div style={popover} key={2}>
          <div style={cover} onClick={this.handleClose} />
          <SketchPicker key={3} color={this.state.penColor} onChangeComplete={this.handleChangeComplete} />
        </div>),

      // <Clock key={4} />,

      <SketchFieldDemo key={5} clearBoolean={this.state.shouldClear} transparent={this.state.toggleTransparent}
        reset={this.state.clearCanvas} color={this.state.penColor} size={this.state.penSize} types={this.state.toolType} />
    ];

    return (
      <div className="App">



        {!this.state.isLoggedIn ? <LoginScreen getReadyToEnter={this.getReadyToEnter} /> : childArr}
      </div>
    );
  }
}


class SketchFieldDemo extends React.Component {


  render() {
    //make a copy of arr to store for later
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



export default App;
