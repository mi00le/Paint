import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './sketch.css';
import {SketchField, Tools} from 'react-sketch';
import { SketchPicker } from 'react-color'
import reactCSS from 'reactcss'

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      background: 'FFF',
      displayColorPicker: false,
      isHidden : true
    }
  }

  toggleHidden = () => {
    this.setState({
      isHidden: !this.state.isHidden
    })
  };

  //display color picker
  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };
  //hide color picker
  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
  };
  

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
        <Navbar handleClick={this.handleClick} toggleHidden={this.toggleHidden} isHidden={this.state.isHidden}/>
        { this.state.displayColorPicker ? <div style={ popover }>
          <div style={ cover } onClick={ this.handleClose }/>
        <SketchPicker color={ this.state.background } onChangeComplete={ this.handleChangeComplete }/>
    </div> : null}
    <SketchFieldDemo color={ this.state.background }/>
      </div>
    );
  }
}



class SketchFieldDemo extends React.Component {

  
  render() {
     return (
       
         <SketchField width='1024px' 
                      height='768px' 
                      tool={Tools.Pencil} 
                      lineColor={this.props.color}
                      lineWidth={3}
                      />
     )
  }
}



class Navbar extends React.Component {

  render(){
    return(


      <div className="dropdown">
      <button className="dropbtn">Tools</button>
      <div className="dropdown-content">

      <a href="#colorPicker" className="toggle-color" onClick={ this.props.handleClick }>Pick Color</a>
      <a href="#morePencils" className="more-pencil" onClick={this.props.toggleHidden}>Pencil</a>
     
      {!this.props.isHidden && (<ul>
            <a href="#pencil">Pencil</a>
            <a href="#line">Line</a>
            <a href="#rectangle">Rectangle</a>
            <a href="#circle">Circle</a>
            <a href="#select">Select</a>
            <a href="#move">Move</a>
        </ul>
      )}
      <a href="#linewidth">Linewidth</a>
      </div>
      
    </div>

    )
  }
}

export default App;
