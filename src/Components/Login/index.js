import React, { Component } from 'react';
import firebase from '../firebase';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import r from '../Register';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            error : null,
            enterMain : false

        };
    }

    validateForm() {
        return  this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        const { email, password } = this.state;
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
                this.setState({
                    enterMain : true
                })
            })
            .catch((error) => {
                this.setState({ error: error });
            });
    };

 
  


    render() {
        const fieldWidth = {
            maxWidth: "40%",
            position: "relative",
            left: "30%",
            "marginTop": "100px",
            border: "1px solid black"
        }

        return (

            <div className="Login">
                <h1>Login</h1>
                <form style={fieldWidth} onSubmit={this.handleSubmit}>
                    <p>{this.props.error}</p>
                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <Button
                        onClick={(this.state.enterMain) ? console.log(this.checkLogin) : console.log("hej")}
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        
                    >
                        Login
                    </Button>
                    <a href="../Register" >New user? Register!</a>
                </form>
            </div>
        )
    }

}