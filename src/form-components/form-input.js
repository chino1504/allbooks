import React, { Component } from 'react';
import Header from '../Header';
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

class FormInput extends Component {
    static contextTypes = {
        router: React.PropTypes.object
    }

    constructor (props) {
       super(props);
       this.onButtonClick = this.onButtonClick.bind(this);
       this.onInputChange = this.onInputChange.bind(this);

       this.state = {
            title: '',
            author: '',
            description: ''
       }
    }

    render() {
        return (
            <div>
                <Header />
                <Form horizontal>
                    <FormGroup controlId="formHorizontalTitle">
                        <Col componentClass={ControlLabel} sm={1}>
                            Titulo
                        </Col>
                        <Col sm={10}>
                            <FormControl type="title" placeholder="Titulo" onChange={this.onInputChange.bind(null, 'title')} />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalAuthor">
                        <Col componentClass={ControlLabel} sm={1}>
                            Autor
                        </Col>
                        <Col sm={10}>
                            <FormControl type="author" placeholder="Autor" onChange={this.onInputChange.bind(null, 'author')} />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalDescription">
                        <Col componentClass={ControlLabel} sm={1}>
                            Descripción
                        </Col>
                        <Col sm={10}>
                            <FormControl type="description" placeholder="Descripción" onChange={this.onInputChange.bind(null, 'description')} />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalYear">
                        <Col componentClass={ControlLabel} sm={1}>
                            Año
                        </Col>
                        <Col sm={10}>
                            <FormControl type="year" placeholder="Año" onChange={this.onInputChange.bind(null, 'year')} />
                        </Col>
                    </FormGroup>
                    <ButtonToolbar>
                        <Col smOffset={10}>
                            <Button type="submit" onClick={this.onButtonClick}>
                                Buscar
                            </Button>
                        </Col>
                    </ButtonToolbar>
                </Form>
            </div>
        );
    }

    onInputChange(id, {target: {value}}) {
        //event.target.value
        this.setState({
            [id]: value
        })
    }

    onButtonClick(event) {
        event.preventDefault();
        //llamar a servicio
        this.savedBooks(this.state.title, this.state.author)

        /*this.context.router.push({
            pathname: '/results',
            query: {
                name: this.state.title,
                author: this.state.author,
                description: this.state.description
            },
        })*/
    }

    savedBooks (title, author) {
        firebase.database().ref('books/').push({
            title: title,
            author: author
        });

        console.log(title, author);
    }
};

//AppInput.propTypes = {
    //inputLabel: React.PropTypes.string,
    //placeholder: React.PropTypes.string
//};

export default FormInput;