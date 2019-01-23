
import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { FaPaintBrush, FaSquareFull, FaCircle, FaMinus, FaRedo, FaUndo, FaFillDrip, FaArrowsAlt, FaEraser, FaSave, FaCloudUploadAlt, FaCoffee } from 'react-icons/fa';
import { IconContext } from "react-icons";
import firebase from '../firebase';
import Lazy from 'react-lazy';


export default class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            load : false,
        }
    }

    componentDidMount(){
        this.currentUser();
    }
    
    currentUser = () => {


        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    username : user.displayName,
                    load : true
                })
                
            } else {
                console.log("invalid")
            }
        });
    }

    uploadImage = () => {


        let c = document.querySelector('.lower-canvas');
        // let dataURL = c.toDataURL();

        // // convert base64 to raw binary data held in a string
        // // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        // var byteString = atob(dataURL.split(',')[1]);
        // // separate out the mime component
        // var mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
        // // write the bytes of the string to an ArrayBuffer
        // var ab = new ArrayBuffer(byteString.length);
        // var dw = new DataView(ab);
        // for (var i = 0; i < byteString.length; i++) {
        //     dw.setUint8(i, byteString.charCodeAt(i));
        // }
        // // write the ArrayBuffer to a blob, and you're done
        // let b = new Blob([ab], { type: mimeString });


        let storage = firebase.storage()
        let storageRef = storage.ref()
        let filesRef = storageRef.child('images/bild.png')


        var dataURL = c.toDataURL('image/png', 0.75)
        filesRef.putString(dataURL, 'data_url')
            .then((snapshot) => {
                window.alert('Uploaded a blob or file!')
                var downloadURL = snapshot.downloadURL
                window.alert(downloadURL)
            }).catch((error) => {
                window.alert(error)
            })

        //back to base64
        // var reader = new FileReader();
        // reader.readAsDataURL(b); 
        // reader.onloadend = function() {
        //    let base64data = reader.result;                
        //     console.log(base64data);
        // }
    }

   
 
    // setUsername = () => {
    //     //refer to 'this' before firebase promises
    //     var that = this;
    //     var name = '';

    //     var user = firebase.auth().currentUser;

    //     user.updateProfile({
    //         displayName: `${that.state.username}`
    //     }).then(function () {
    //         console.log(that.state.username);
    //         // Update successful.
    //     }).catch(function (error) {
    //         console.log(error);
    //     });
    // }

    // enterUsername = (e) => {
    //     this.setState({
    //         username : e.target.value
    //     })
    // } 




    render() {
        return (
           
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                    {this.state.load && <p>{this.state.username}</p>}
                        <a href="#brand">Paint</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavDropdown eventKey={1} title="Tools" id="basic-nav-dropdown">
                            <MenuItem eventKey={1.1} onClick={() => this.props.handleToolType("pencil")}><IconContext.Provider value={{ color: "black", size: "2.5em", className: "global-class-name" }}>
                                <div>
                                    <FaPaintBrush></FaPaintBrush>
                                </div>
                            </IconContext.Provider></MenuItem>
                            <MenuItem eventKey={1.2} onClick={() => this.props.handleToolType("line")}><IconContext.Provider value={{ color: "black", size: "2.5em", className: "global-class-name" }}>
                                <div>
                                    <FaMinus></FaMinus>
                                </div>
                            </IconContext.Provider></MenuItem>
                            <MenuItem eventKey={1.3} onClick={() => this.props.handleToolType("rectangle")}><IconContext.Provider value={{ attr: { fill: "none", strokeWidth: 50 }, color: "black", size: "2.5em", className: "global-class-name" }}>
                                <div>
                                    <FaSquareFull></FaSquareFull>
                                </div>
                            </IconContext.Provider></MenuItem>
                            <MenuItem eventKey={1.4} onClick={() => this.props.handleToolType("circle")}><IconContext.Provider value={{ attr: { fill: "none", strokeWidth: 25 }, color: "black", size: "2.5em", className: "global-class-name" }}>
                                <div>
                                    <FaCircle></FaCircle>
                                </div>
                            </IconContext.Provider></MenuItem>
                            <MenuItem eventKey={1.5} onClick={this.props.handleTransparent}><IconContext.Provider value={{ color: "black", size: "2.5em", className: "global-class-name" }}>
                                <div>
                                    <FaFillDrip></FaFillDrip>
                                </div>
                            </IconContext.Provider></MenuItem>
                            <MenuItem eventKey={1.7} onClick={this.props.handleEraser}><IconContext.Provider value={{ color: "black", size: "2.5em", className: "global-class-name" }}>
                                <div>
                                    <FaEraser></FaEraser>
                                </div>
                            </IconContext.Provider></MenuItem>
                        </NavDropdown>
                        <NavItem eventKey={2} href="#color" onClick={this.props.handleClick}>
                            Color
                        </NavItem>
                        <NavDropdown eventKey={3} title="Pen Size" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1} onClick={() => this.props.handlePenSize(30)}><IconContext.Provider value={{ color: "black", size: "2em", className: "global-class-name" }}>
                                <div>
                                    <FaCircle />
                                </div>
                            </IconContext.Provider></MenuItem>
                            <MenuItem eventKey={3.2} onClick={() => this.props.handlePenSize(20)}><IconContext.Provider value={{ color: "black", size: "1.5em", className: "global-class-name" }}>
                                <div>
                                    <FaCircle />
                                </div>
                            </IconContext.Provider></MenuItem>
                            <MenuItem eventKey={3.3} onClick={() => this.props.handlePenSize(10)}><IconContext.Provider value={{ color: "black", size: "1em", className: "global-class-name" }}>
                                <div>
                                    <FaCircle />
                                </div>
                            </IconContext.Provider></MenuItem>
                            {/* <MenuItem divider />
                            <MenuItem eventKey={3.3}>Separated link</MenuItem> */}
                        </NavDropdown>
                        <NavItem eventKey={2} href="#clear" onClick={this.props.handleClear}>
                            Clear Canvas
                        </NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={2} href="#save" className="global-class-name" onClick={() => { let c = document.querySelector('.lower-canvas'); let dataURL = c.toDataURL().replace("image/png", "image/octet-stream"); window.open(`${dataURL}`, '_blank'); }}>
                            <IconContext.Provider value={{ color: "white", size: "2em", className: "global-class-name" }}>
                                <div>
                                    <FaSave />
                                </div>
                            </IconContext.Provider>

                        </NavItem>
                        <NavItem eventKey={2} href="#upload" className="global-class-name" onClick={this.uploadImage}>
                            <IconContext.Provider value={{ color: "white", size: "2em", className: "global-class-name" }}>
                                <div>
                                    <FaCloudUploadAlt />
                                </div>
                            </IconContext.Provider>

                        </NavItem>
                        <NavItem eventKey={3} href="#profile" className="global-class-name" onClick={() => { console.log("hello") }}>
                            <IconContext.Provider value={{ color: "white", size: "2em", className: "global-class-name" }}>
                                <div>
                                    <FaCoffee />
                                </div>
                            </IconContext.Provider>

                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        
        );
    }

}
