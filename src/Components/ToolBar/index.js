
import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { FaPaintBrush, FaSquareFull, FaCircle, FaMinus, FaFillDrip, FaEraser, FaSave, FaCloudUploadAlt, FaDownload, FaWindowClose } from 'react-icons/fa';
import { IconContext } from "react-icons";
import firebase from '../firebase';


//array for storing image url in & is later used in downloadImage()
let arr = [];

export default class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            load: false,
            out: false,
            mail: '',
            image: '',
            galleryOpen: false,
            numberOfImg: 0,
            more: 0,
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
        localStorage.setItem(email, JSON.stringify(newCount));

        //accessing canvas and applying a white background to it
        let c = document.querySelector('.lower-canvas');
        let ctx = c.getContext('2d');
        ctx.getImageData(0, 0, c.width, c.height);
        let compositeOperation = ctx.globalCompositeOperation;
        ctx.globalCompositeOperation = "destination-over";
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, c.width, c.height);

        let storage = firebase.storage()
        let storageRef = storage.ref()
        let filesRef = storageRef.child(`images/${email}/${newCount}.png`);

        firebase.auth().onAuthStateChanged((user) => {
            this.setState({
                load: true
            })
            var dataURL = c.toDataURL(`image/${newCount}.png`, 0.20)

            let uploadTask = filesRef.putString(dataURL, 'data_url');
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            }, function (error) {
                console.log("Ops! An error occured!", error);
            }, function () {
                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    console.log("File available at", downloadURL)

                    //push image url to localstorage with a key of "email"-IMG
                    if (localStorage.getItem(`${email}-IMG`) === null) {
                        let temp = [downloadURL];
                        localStorage.setItem(`${email}-IMG`, JSON.stringify(temp))
                    } else {
                        let t = JSON.parse(localStorage.getItem(`${email}-IMG`));
                        t.push(downloadURL);

                        localStorage.setItem(`${email}-IMG`, JSON.stringify(t));
                    }
                    //reset the globalCompositeOperation to what it was
                    ctx.globalCompositeOperation = compositeOperation;
                    alert("Finished upload!");
                })
            });


        });
    }


    downloadImage = () => {
        //get current email 
        var curr = firebase.auth().currentUser;
        var email;

        if (curr != null) {
            email = curr.email;
        }

        let b = localStorage.getItem(`${email}-IMG`);
        if (b == null) {
            alert("There's no images in the gallery :(");
        } else {
            let z = JSON.parse(b);
            arr = [];
            for (let i = 0; i < z.length; i++) {
                arr.push(z[i]);
            }
            this.setState({
                galleryOpen: true,
                imgArr: arr.splice(0, arr.length)
            })


        }

    }


    loadNextImg = () => {
        //scroll through imgArr
        if (this.state.more >= this.state.imgArr.length - 1) {
            this.setState({
                more: 0
            })
        } else {
            this.setState({
                more: this.state.more + 1
            })
        }
    }

    loadPrevImg = () => {
        //same as before but backwards
        if (this.state.more <= 0) {
            this.setState({
                more: this.state.imgArr.length - 1
            })
        } else {
            this.setState({
                more: this.state.more - 1
            })
        }
    }

    deleteImg = () => {
        //retrieve current user email
        var curr = firebase.auth().currentUser;
        var email;

        if (curr != null) {
            email = curr.email;
        }

        //get user-email from localstorage with image url stored in array
        let b = localStorage.getItem(`${email}-IMG`);
        let bb = JSON.parse(b);
        bb.splice(this.state.more, 1);
        
        let s = this.state.imgArr[this.state.more];
        localStorage.setItem(`${email}-IMG`, JSON.stringify(bb));

        //remove extra from url leaving only img name
        let matchImg = s.match(/([0-9]{1,3}.[png])\w+/gi);
        let matchToString = matchImg.join('');

        //reference to firebase storage
        let storage = firebase.storage()
        let storageRef = storage.ref();
        let removeRef = storageRef.child(`images/${email}/${matchToString}`);
        removeRef.delete().then(() => {
            alert("Image deleted");
        }).catch(() => {
            alert("Unable to delete! Contact customer service!");
        })
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
                        <NavItem eventKey={3.4} href="#clear" onClick={this.props.handleClear}>
                            Clear Canvas
                        </NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={3.5} href="#save" className="global-class-name" onClick={() => { let c = document.querySelector('.lower-canvas'); let dataURL = c.toDataURL().replace("image/png", "image/octet-stream"); window.open(`${dataURL}`, '_blank');  }}>
                            <IconContext.Provider value={{ color: "white", size: "2em", className: "global-class-name" }}>
                                <div>
                                    <FaSave />
                                </div>
                            </IconContext.Provider>

                        </NavItem>
                        <NavItem eventKey={3.6} href="#upload" className="global-class-name" onClick={this.uploadImage}>
                            <IconContext.Provider value={{ color: "white", size: "2em", className: "global-class-name" }}>
                                <div>
                                    <FaCloudUploadAlt />
                                </div>
                            </IconContext.Provider>

                        </NavItem>
                        <NavItem eventKey={3.7} href="#profile" className="global-class-name" onClick={this.downloadImage}>
                            <IconContext.Provider value={{ color: "white", size: "2em", className: "global-class-name" }}>
                                <div>
                                    <FaDownload />
                                </div>
                            </IconContext.Provider>

                        </NavItem>
                        {this.state.galleryOpen && (

                            <NavDropdown eventKey={4} title="Gallery" id="basic-nav-dropdown" className="Gallery">
                                <div className="button-container">
                                    <button onClick={this.loadPrevImg}>Prev</button>
                                    <button onClick={this.deleteImg} style={{ color: "red"}}>DELETE</button>
                                    <button onClick={this.loadNextImg}>Next</button>
                                </div>

                                <MenuItem eventKey={4.1}>
                                    <div>
                                        <img width="300" height="200" alt="No image to display :c" src={this.state.imgArr[this.state.more]} onClick={() => window.open(this.state.imgArr[this.state.more])}></img>
                                    </div>
                                </MenuItem>
                            </NavDropdown>

                        )}
                        <NavItem eventKey={5} href="#Logout" className="global-class-name" onClick={() => this.props.getMeOut(false)}>
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
