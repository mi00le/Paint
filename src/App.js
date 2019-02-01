import React, { Component } from 'react';
import './Css/App.css';
import './Css/sketch.css';
import './Css/register.css';
import './Css/toolbar.css';
import { SketchPicker } from 'react-color'
import LoginScreen from './Components/LoginScreen';
import ToolBar from './Components/ToolBar';
import SketchFieldDemo from './Components/SketchFieldDemo';
import firebase from './Components/firebase';


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
      isLoggedIn: false,
      init : false

    }
  }

  componentDidMount(){
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          isLoggedIn : true,
          init : true
        });
      } else {
        this.setState({
        isLoggedIn : false,
        init : true
        });
      }
    });
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

    //solved rendering error by adding a delay on setState
  setTimeout(()=>{
    this.setState({
      isLoggedIn: a
    });
  },50);
  }

  //Logout 
  getMeOut = (e) => {
    firebase.auth().signOut().then(() => {
      console.log("logged out");


    }, function (error) {
      console.error('Sign Out Error', error);
    });
    //added timer so it can keep up
    setTimeout(() => {
      this.setState({
        isLoggedIn: e
      })
    }, 100);

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

    if(!this.state.init){
      return <div></div>
    }
    return (
      <div className="App">

        {!this.state.isLoggedIn ? <LoginScreen getReadyToEnter={this.getReadyToEnter} /> : ([

          <ToolBar key={1} getMeOut={this.getMeOut} onSketchChange={this.onSketchChange} handleTransparent={this.handleTransparent}
            handleClick={this.handleClick} handlePenSize={this.handlePenSize} handleToolType={this.handleToolType}
            handleClear={this.handleClear} handleEraser={this.handleEraser} />,

          this.state.displayColorPicker && (
            <div style={popover} key={2}>
              <div style={cover} onClick={this.handleClose} />
              <SketchPicker key={3} color={this.state.penColor} onChangeComplete={this.handleChangeComplete} />
            </div>),

          <SketchFieldDemo key={5} clearBoolean={this.state.shouldClear} transparent={this.state.toggleTransparent}
            reset={this.state.clearCanvas} color={this.state.penColor} size={this.state.penSize} types={this.state.toolType} />
        ])}

      </div>
    );
  }
}






export default App;
