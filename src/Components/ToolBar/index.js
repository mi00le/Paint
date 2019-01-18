
import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { FaPaintBrush, FaSquareFull, FaCircle, FaMinus, FaRedo, FaUndo, FaFillDrip, FaArrowsAlt, FaEraser } from 'react-icons/fa';
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
                        <NavDropdown eventKey={1} title="Tools" id="basic-nav-dropdown">
                            <MenuItem eventKey={1.1} onClick={() => this.props.handleToolType("pencil")}><IconContext.Provider value={{ color: "black",size : "2.5em", className: "global-class-name" }}>
                                <div>
                                <FaPaintBrush></FaPaintBrush>
                                </div>
                            </IconContext.Provider></MenuItem>
                            <MenuItem eventKey={1.2} onClick={() => this.props.handleToolType("line")}><IconContext.Provider value={{ color: "black",size : "2.5em", className: "global-class-name" }}>
                                <div>
                                <FaMinus></FaMinus>
                                </div>
                            </IconContext.Provider></MenuItem>
                            <MenuItem eventKey={1.3} onClick={() => this.props.handleToolType("rectangle")}><IconContext.Provider value={{ attr : {fill: "none", strokeWidth: 50}, color: "black",size : "2.5em", className: "global-class-name" }}>
                                <div>
                                <FaSquareFull></FaSquareFull>
                                </div>
                            </IconContext.Provider></MenuItem>
                            <MenuItem eventKey={1.4} onClick={() => this.props.handleToolType("circle")}><IconContext.Provider value={{ attr : {fill: "none", strokeWidth: 25}, color: "black",size : "2.5em", className: "global-class-name" }}>
                                <div>
                                <FaCircle></FaCircle>
                                </div>
                            </IconContext.Provider></MenuItem>
                            <MenuItem eventKey={1.5} onClick={this.props.handleTransparent}><IconContext.Provider value={{ color: "black",size : "2.5em", className: "global-class-name" }}>
                                <div>
                                <FaFillDrip></FaFillDrip>
                                </div>
                            </IconContext.Provider></MenuItem>
                            <MenuItem eventKey={1.6} onClick={() => this.props.handleToolType("select")}><IconContext.Provider value={{ color: "black",size : "2.5em", className: "global-class-name" }}>
                                <div>
                                <FaArrowsAlt></FaArrowsAlt>
                                </div>
                            </IconContext.Provider></MenuItem>
                            <MenuItem eventKey={1.7} onClick={this.props.handleEraser}><IconContext.Provider value={{ color: "black",size : "2.5em", className: "global-class-name" }}>
                                <div>
                                <FaEraser></FaEraser>
                                </div>
                            </IconContext.Provider></MenuItem>
                            {/* <MenuItem divider />
                            <MenuItem eventKey={1.3}>Separated link</MenuItem> */}
                        </NavDropdown>
                        <NavItem eventKey={2} href="#color" onClick={ this.props.handleClick }>
                            Color
                        </NavItem>
                        <NavDropdown eventKey={3} title="Pen Size" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1} onClick={ () => this.props.handlePenSize(30) }><IconContext.Provider value={{ color: "black",size : "2em", className: "global-class-name" }}>
                                <div>
                                    <FaCircle />
                                </div>
                            </IconContext.Provider></MenuItem>
                            <MenuItem eventKey={3.2} onClick={ () => this.props.handlePenSize(20)}><IconContext.Provider value={{ color: "black",size : "1.5em", className: "global-class-name" }}>
                                <div>
                                    <FaCircle />
                                </div>
                            </IconContext.Provider></MenuItem>
                            <MenuItem eventKey={3.3} onClick={ () => this.props.handlePenSize(10)}><IconContext.Provider value={{ color: "black",size : "1em", className: "global-class-name" }}>
                                <div>
                                    <FaCircle />
                                </div>
                            </IconContext.Provider></MenuItem>
                            {/* <MenuItem divider />
                            <MenuItem eventKey={3.3}>Separated link</MenuItem> */}
                        </NavDropdown>
                        <NavItem eventKey={2} href="#clear" onClick={ this.props.handleClear }>
                            Clear Canvas
                        </NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={1} className="global-class-name" href="#undo" onClick={this.props.undo } disabled={!this.props.canUndo}>
                        <IconContext.Provider value={{ color: "white",size : "2em", className: "global-class-name" }}>
                                <div>
                                    <FaUndo />
                                </div>
                            </IconContext.Provider>
                        </NavItem>
                        <NavItem eventKey={2} href="#redo" className="global-class-name" onClick={this.props.redo } disabled={!this.props.canRedo}>
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