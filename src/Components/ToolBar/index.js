
import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { FaPen, FaSquare, FaCircle, FaMinus, FaRedo, FaUndo } from 'react-icons/fa';
import { IconContext } from "react-icons";

export default class Toolbar extends React.Component {

    render() {
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#brand">Painter</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavDropdown eventKey={1} title="Pencil" id="basic-nav-dropdown">
                            <MenuItem eventKey={1.1}><FaPen></FaPen></MenuItem>
                            <MenuItem eventKey={1.3}><FaMinus></FaMinus></MenuItem>
                            <MenuItem eventKey={1.2}><FaSquare></FaSquare></MenuItem>
                            <MenuItem eventKey={1.3}><FaCircle></FaCircle></MenuItem>
                            {/* <MenuItem divider />
                            <MenuItem eventKey={1.3}>Separated link</MenuItem> */}
                        </NavDropdown>
                        <NavItem eventKey={2} href="#">
                            Color
                        </NavItem>
                        <NavDropdown eventKey={3} title="Pen Size" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1} onClick={()=> console.log("3")}><IconContext.Provider value={{ color: "black",size : "2em", className: "global-class-name" }}>
                                <div>
                                    <FaCircle />
                                </div>
                            </IconContext.Provider></MenuItem>
                            <MenuItem eventKey={3.2} onClick={()=> console.log("2")}><IconContext.Provider value={{ color: "black",size : "1.5em", className: "global-class-name" }}>
                                <div>
                                    <FaCircle />
                                </div>
                            </IconContext.Provider></MenuItem>
                            <MenuItem eventKey={3.3} onClick={()=> console.log("1")}><IconContext.Provider value={{ color: "black",size : "1em", className: "global-class-name" }}>
                                <div>
                                    <FaCircle />
                                </div>
                            </IconContext.Provider></MenuItem>
                            {/* <MenuItem divider />
                            <MenuItem eventKey={3.3}>Separated link</MenuItem> */}
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={1} className="global-class-name" href="#undo" onClick={()=> console.log("Undo") }>
                        <IconContext.Provider value={{ color: "white",size : "2em", className: "global-class-name" }}>
                                <div>
                                    <FaUndo />
                                </div>
                            </IconContext.Provider>
                        </NavItem>
                        <NavItem eventKey={2} href="#redo" className="global-class-name" onClick={()=> console.log("Redo") }>
                        <IconContext.Provider value={{ color: "white",size : "2em", className: "global-class-name" }}>
                                <div>
                                    <FaRedo />
                                </div>
                            </IconContext.Provider>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        );
    }

}