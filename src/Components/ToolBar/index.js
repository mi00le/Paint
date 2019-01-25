
import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { FaPaintBrush, FaSquareFull, FaCircle, FaMinus, FaFillDrip, FaEraser, FaSave, FaCloudUploadAlt, FaCoffee, FaWindowClose } from 'react-icons/fa';
import { IconContext } from "react-icons";
import firebase from '../firebase';






export default class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            load: false,
            out: false,
            mail: ''
        }
    }



    uploadImage = () => {
        var curr = firebase.auth().currentUser;
        var email;

        if (curr != null) {
            email = curr.email;
        }
        let data = localStorage.getItem(email);
        let newCount = JSON.parse(data);
        newCount++;

        let q = localStorage.setItem(email,JSON.stringify(newCount));
        let c = document.querySelector('.lower-canvas');


        let rightNow = new Date();
        let res = rightNow.toISOString().slice(0, 19).replace(/:/g, ".").replace(/-/g, ".").replace(/T/g, " ");


        let storage = firebase.storage()
        let storageRef = storage.ref()
        let filesRef = storageRef.child(`images/${email}/${newCount}.png`);

        firebase.auth().onAuthStateChanged((user) => {
                this.setState({
                    username: user.displayName,
                    load: true
                })
                var dataURL = c.toDataURL(`image/${newCount}.png`, 0.75)

                let uploadTask = filesRef.putString(dataURL, 'data_url');
                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                }, function (error) {
                    console.log("Ops! An error occured!", error);
                }, function () {
                    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                        console.log("File available at", downloadURL)
                        alert("Done!");
                    })
                });


        });
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
                                    <FaWindowClose />
                                </div>
                            </IconContext.Provider>

                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        );
    }

}
