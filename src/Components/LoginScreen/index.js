import React from 'react';
import firebase from '../firebase';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            head: false,
            back: true,
            final: false,
            username: '',
            email: '',
            password: '',
            val: false,
            count: 0
        }
    }

    //increment counter for image for later 
    handleIncrement = () => {
        
        this.setState(prevState => {
            return {
                count: ++prevState.count
            }
        })
    }

    //check length of email & password
    validateForm() {
        
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    //Registration
    handleReg = event => {
        event.preventDefault();
        const { email, password } = this.state;
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
                this.setState({
                    head: true,
                })
            })
            .catch((error) => {
                alert("A user with this email already exists!");
                this.setState({ error: error });
            });
    };

    //Login
    handleLogin = event => {
        event.preventDefault();
        const { email, password } = this.state;
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
                this.handleIncrement();
                this.pushEmailToLocal();
                this.setState({
                    val: true
                })
            })
            .catch((error) => {

                this.setState({ error: error });
            });
    }

    //Toggle register & login screen
    switchScreen = () => {
        this.setState({
            head: true,

        });
    }

    //Toggle back to prev screen
    switchBack = () => {
        this.setState({
            head: false,
        })
    }

    //save email info to localStorage for use later on
    pushEmailToLocal = () => {

        var user = firebase.auth().currentUser;
        let email = user.email;
        let b = localStorage.getItem("email");
        if (email === b) {

            let data = localStorage.getItem(email);
            let newCount = JSON.parse(data);
            this.setState({ count: newCount })
            localStorage.setItem(email, JSON.stringify(newCount));
        }

        localStorage.setItem(email, JSON.stringify(this.state.count));
        localStorage.setItem("email", email);

    }

    render() {
        const fieldWidth = {
            maxWidth: "40%",
            position: "relative",
            left: "30%",
            marginTop: "100px"
        }

        const header = {
            fontFamily: "Lobster, cursive"
        }
        return (
            <div id="container" className={!this.state.head ? "Register" : "Login"} key={40}>
                <div className={!this.state.head ? "w3-center w3-animate-zoom0" : "w3-center w3-animate-zoom01"}>
                <h1 className="header" style={header}>{!this.state.head ? "Register" : "Login"}</h1>
                </div>
                <form style={fieldWidth} onSubmit={!this.state.head ? this.handleReg : (this.handleLogin)}>
                    <p>{this.props.error}</p>
                    <FormGroup controlId="email" bsSize="large" className={!this.state.head ? "w3-center w3-animate-left" : "w3-center w3-animate-right" }>
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            className="input"
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large" className={!this.state.head ? "w3-center w3-animate-right" : "w3-center w3-animate-left" }>
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                            autoComplete="off"
                            className="input"
                        />
                    </FormGroup>
                    <div className={!this.state.head ? "w3-center w3-animate-left" : "w3-center w3-animate-right"}>
                    <Button
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        {!this.state.head ? "Register" : ("Login")}
                    </Button>
                    </div>
                    <p>{this.state.val ? this.props.getReadyToEnter(true) : ""}</p>
                    <a className="switch" style={{fontSize:"20px"}} href={!this.state.head ? "#login" : "#register"} onClick={!this.state.head ? this.switchScreen : this.switchBack}>{!this.state.head ? "Already an account? Login!" : "New user? Register!"}</a>
                </form>
            </div>
        );
    }
}