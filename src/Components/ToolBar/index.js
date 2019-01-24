
import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { FaPaintBrush, FaSquareFull, FaCircle, FaMinus, FaRedo, FaUndo, FaFillDrip, FaArrowsAlt, FaEraser, FaSave, FaCloudUploadAlt, FaCoffee, FaToggleOff } from 'react-icons/fa';
import { IconContext } from "react-icons";
import firebase from '../firebase';
import Lazy from 'react-lazy';





export default class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            load: false,
            out: false,
            mail: '',
        }
    }


    uploadImage = () => {
        let inputImageName = prompt('Enter Image name');
        if(inputImageName == null || inputImageName == ''){
            this.uploadImage();
        }else{
        setTimeout(() => {
            var curr = firebase.auth().currentUser;
            var email;

            if (curr != null) {
                email = curr.email;
            }
            let c = document.querySelector('.lower-canvas');


            let rightNow = new Date();
            let res = rightNow.toISOString().slice(0, 19).replace(/:/g, ".").replace(/-/g, ".").replace(/T/g, " ");
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
            let filesRef = storageRef.child(`images/${email}/${inputImageName}.png`);

            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    this.setState({
                        username: user.displayName,
                        load: true
                    })
                    var dataURL = c.toDataURL(`image/${email}.png`, 0.75)

                    let uploadTask = filesRef.putString(dataURL, 'data_url');
                    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
                        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED: // or 'paused'
                                console.log('Upload is paused');
                                break;
                            case firebase.storage.TaskState.RUNNING: // or 'running'
                                console.log('Upload is running');
                                break;
                        }
                    }, function (error) {
                        console.log("Ops! An error occured!", error);
                    }, function () {
                        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                            console.log("File available at", downloadURL)
                        })
                    });
                } else {
                    console.log("invalid User")
                }

            });
        }, 2000);




        //back to base64
        // var reader = new FileReader();
        // reader.readAsDataURL(b); 
        // reader.onloadend = function() {
        //    let base64data = reader.result;                
        //     console.log(base64data);
        // }
    }
    }



    render() {
        return (

            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
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
                        <NavItem eventKey={3} href="#Logout" className="global-class-name" onClick={() => this.props.getMeOut(false)}>
                            <IconContext.Provider value={{ color: "white", size: "2em", className: "global-class-name" }}>
                                <div>
                                    <FaToggleOff />
                                </div>
                            </IconContext.Provider>

                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        );
    }

}
