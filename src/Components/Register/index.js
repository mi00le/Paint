import React, { Component } from 'react';
import firebase from '../firebase';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Login from '../Login';

export default class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            password: "",
            error : null,
            switchLogin : false

        };
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.email.length > 0 && this.state.password.length > 0;
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
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
                this.props.history.push('/');
                this.setState({
                    switchLogin : true
                })
            })
            .catch((error) => {
                this.setState({ error: error });
            });
    };

    handleLogin = event => {
        event.preventDefault();
        const { email, password } = this.state;
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
                this.props.history.push('/Login');
            })
            .catch((error) => {
                this.setState({ error: error });
            });
    }

    handleComponent = () => {
        this.setState({
            switchLogin : true
        })
    }


    render() {
        const fieldWidth = {
            maxWidth: "40%",
            position: "relative",
            left: "30%",
            "marginTop": "100px",
            border: "1px solid black"
        }

        let regArr = [
            <div className="Register" key={40}>
                    <h1>Register</h1>
                    <form style={fieldWidth} onSubmit={this.handleSubmit}>
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
                            Register
                        </Button>
                       <a href="#login" onClick={this.handleComponent}>Already an account? Login!</a>
                    </form>
                </div>
        ];
        
        
        
        return (
            <>
            {(!this.state.switchLogin) ? (regArr) : <Login handleLogin={this.handleLogin} handleComponent={this.handleComponent}/>}
            </>
            
        )
        
    }

}