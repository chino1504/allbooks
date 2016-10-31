import React, { Component } from 'react';
import {
    Button,
    ButtonToolbar,
    Col,
    ControlLabel,
    Form,
    FormControl,
    FormGroup
} from 'react-bootstrap';
import firebase from 'firebase';

/*var config = {
    apiKey: "AIzaSyCAjldpMucRCU8prGFnByMXFZ7pNzV31k8",
    authDomain: "allbooks-2b844.firebaseapp.com",
    databaseURL: "https://allbooks-2b844.firebaseio.com",
    storageBucket: "allbooks-2b844.appspot.com",
    messagingSenderId: "1067582285200"
};
firebase.initializeApp(config);*/

class FormLogin extends Component {
    static contextTypes = {
        router: React.PropTypes.object
    }

    constructor (props) {
       super(props);
       this.onButtonClick = this.onButtonClick.bind(this);
       this.onInputChange = this.onInputChange.bind(this);
       this.navigateToSearch = this.navigateToSearch.bind(this);

       this.state = {
            errorCode: '',
            errorMessage: ''
       }
    }

    componentWillMount () {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                this.navigateToSearch()
            }
        });
    }

	render() {
        var errorComponent = null;

        if (this.state.errorCode) {
            errorComponent = this.state.errorMessage
        }

        return (
            <Form horizontal>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={1}>
                        Usuario
                    </Col>
                    <Col sm={10}>
                        <FormControl type="user" placeholder="Email" onChange={this.onInputChange.bind(null, 'user')}/>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={1}>
                        Contraseña
                    </Col>
                    <Col sm={10}>
                        <FormControl type="password" placeholder="Contraseña" onChange={this.onInputChange.bind(null, 'password')}/>
                    </Col>
                </FormGroup>
                <ButtonToolbar>
                    <Col smOffset={10}>
                        <Button type="submit" onClick={this.onButtonClick}>
                            LogIn
                        </Button>
                    </Col>
                </ButtonToolbar>
                {errorComponent}
            </Form>
        );
    }

    onInputChange (id, {target: {value}}) {
        //event.target.value
        this.setState({
            [id]: value
        })
    }

    onButtonClick (event) {
        event.preventDefault();
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                this.navigateToSearch()
            } else {
                // No user is signed in.
                firebase.auth().signInWithEmailAndPassword(this.state.user, this.state.password)
                .then((response)  => {
                    this.navigateToSearch()
                })
                .catch((error) => {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ...
                    this.setState({
                        errorCode: errorCode,
                        errorMessage: errorMessage
                    })
                });
            }
        });
    }

    navigateToSearch () {
        this.context.router.push({
            pathname: '/search'
        })
    }
}

export default FormLogin;