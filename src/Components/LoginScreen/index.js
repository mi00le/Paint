import React, { Component } from 'react';
import firebase from '../firebase';
import Login from '../Login';
import Register from '../Register';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export default class LoginScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            head : false,
            back : true,
            final : false,
            username : '',
            email : '',
            password : '',
            val : false
        }        
    }

    validateForm(){
        return this.state.username.length > 0 && this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    setValueToTrue = (a) => {
        this.setState({
            final : a
           })
    }

    handleReg = event => {
        event.preventDefault();
        const { email, password } = this.state;
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
                this.setState({
                    head : true,
                })
            })
            .catch((error) => {
               
                this.setState({ error: error});
            });
    };

    handleLogin = event => {
        event.preventDefault();
        const { email, password } = this.state;
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
                this.setState({
                    val : true
                })
            })
            .catch((error) => {
                
                this.setState({ error: error });
            });
    }

    switchScreen = () => {
        this.setState({
            head : true,

        });
    }
    switchBack = () => {
        this.setState({
            head : false,
        })
    }



    render(){
        const fieldWidth = {
            maxWidth: "40%",
            position: "relative",
            left: "30%",
            "marginTop": "100px",
            border: "1px solid black"
        }
        return(
            <div className={!this.state.head ? "Register" : "Login"} key={40}>
                    <h1>{!this.state.head ? "Register" : "Login"}</h1>
                    <form style={fieldWidth} onSubmit={!this.state.head ? this.handleReg : this.handleLogin}>
                        <p>{this.props.error}</p>
                        <FormGroup controlId="username" bsSize="large">
                            <ControlLabel>Username</ControlLabel>
                            <FormControl
                                autoFocus
                                type="username"
                                value={this.state.username}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
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
                            block
                            bsSize="large"
                            disabled={!this.validateForm()}
                            type="submit"
                        >
                            {!this.state.head ? "Register" : ("Login")}
                        </Button>
                        <p>{this.state.val ? this.props.getReadyToEnter(this.state.val) : "Unable to sign in!"}</p>
                       <a href={!this.state.head ? "#login" : "#register"} onClick={!this.state.head ? this.switchScreen  : this.switchBack}>{!this.state.head ? "Already an account? Login!" : "New user? Register!"}</a>
                    </form>
                </div>
        );
    }
}