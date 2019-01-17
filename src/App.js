import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './sketch.css';
import {SketchField, Tools} from 'react-sketch';
import { SketchPicker } from 'react-color'
import reactCSS from 'reactcss'
import ToolBar from './Components/ToolBar/index.js';
class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      penColor: {
        r : 0,
        g : 0,
        b : 0,
        a : 100
      },
      displayColorPicker: false,
      isHidden : true,
      penSize : 10,
      toolType : "pencil",
      toggleTransparent : true
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
  //after color is picked
  handleChangeComplete = (color) => {
    
    this.setState({ penColor: color.rgb});
    console.log(color.rgb,color.hex);
  };
  //pensize handler
  handlePenSize = (penSize) => {this.setState({penSize})}
  
  //toolType handler
  handleToolType = (toolType) => { this.setState({toolType})} 

  //toggle transparent fill
  handleTransparent = () => { this.setState({ toggleTransparent : !this.state.toggleTransparent })}

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
      
        {/* <Navbar handleClick={this.handleClick} toggleHidden={this.toggleHidden} isHidden={this.state.isHidden}/> */}
        <ToolBar handleTransparent={ this.handleTransparent } handleClick={this.handleClick} handlePenSize={ this.handlePenSize } handleToolType={ this.handleToolType }/>
        { this.state.displayColorPicker ? <div style={ popover }>
          <div style={ cover } onClick={ this.handleClose }/>
        <SketchPicker color={ this.state.penColor } onChangeComplete={ this.handleChangeComplete }/>
    </div> : null}
    <SketchFieldDemo transparent={this.state.toggleTransparent}  color={ this.state.penColor } size={ this.state.penSize } types={ this.state.toolType }/>
      </div>
    );
  }
}



class SketchFieldDemo extends React.Component {

  
  
  render() {
     return (
       
         <SketchField width='800px' 
                      height='700px' 
                      tool={this.props.types} 
                      lineColor={`rgba(${this.props.color.r},${this.props.color.g},${this.props.color.b},${this.props.color.a})`}
                      lineWidth={this.props.size}
                      backgroundColor='white'
                      undoSteps={2}
                      fillColor={this.props.transparent ? "transparent" : `rgba(${this.props.color.r},${this.props.color.g},${this.props.color.b},100)`}
                      style={{position:"relative",margin:"auto",top:"20px"}}
                      />
                      // this.props.color.a < 1 ? ("transparent",console.log(this.props.color.a)) : `rgba(${this.props.color.r},${this.props.color.g},${this.props.color.b},100)`
     )
  }
}



// class Navbar extends React.Component {

//   render(){
//     return(


//       <div className="dropdown">
//       <button className="dropbtn">Tools</button>
//       <div className="dropdown-content">

//       <a href="#colorPicker" className="toggle-color" onClick={ this.props.handleClick }>Pick Color</a>
//       <a href="#morePencils" className="more-pencil" onClick={this.props.toggleHidden}>Pencil</a>
     
//       {!this.props.isHidden && (<ul>
//             <a href="#pencil">Pencil</a>
//             <a href="#line">Line</a>
//             <a href="#rectangle">Rectangle</a>
//             <a href="#circle">Circle</a>
//             <a href="#select">Select</a>
//             <a href="#move">Move</a>
//         </ul>
//       )}
//       <a href="#linewidth">Linewidth</a>
//       </div>
      
//     </div>

//     )
//   }
// }

export default App;
