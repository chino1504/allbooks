import React, { Component } from 'react';
import './form-search.css';
import {
    Button,
    ButtonToolbar,
    Col,
    ControlLabel,
    Form,
    FormControl,
    FormGroup
} from 'react-bootstrap';

class FormSearch extends Component {
    static contextTypes = {
        router: React.PropTypes.object
    }

    constructor (props) {
       super(props);
       this.onButtonClick = this.onButtonClick.bind(this);
       this.onInputChange = this.onInputChange.bind(this);

       this.state = {
            name: '',
            author: ''
       }
    }

    render() {
        return (
            <Form horizontal className="form-search">
                <FormGroup controlId="formHorizontalTitle">
                    <Col componentClass={ControlLabel} sm={1}>
                        Titulo
                    </Col>
                    <Col sm={10}>
                        <FormControl type="titulo" placeholder="Titulo" onChange={this.onInputChange.bind(null, 'titulo')} />
                    </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalAuthor">
                    <Col componentClass={ControlLabel} sm={1}>
                        Autor
                    </Col>
                    <Col sm={10}>
                        <FormControl type="autor" placeholder="autor" onChange={this.onInputChange.bind(null, 'autor')}/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalDescription">
                    <Col componentClass={ControlLabel} sm={1}>
                        Descripción
                    </Col>
                    <Col sm={10}>
                        <FormControl type="descripcion" placeholder="Descripción" />
                    </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalYear">
                    <Col componentClass={ControlLabel} sm={1}>
                        Año
                    </Col>
                    <Col sm={10}>
                        <FormControl type="año" placeholder="Año" />
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
        this.context.router.push({
            pathname: '/results',
            query: {
                name: this.state.titulo,
                author: this.state.autor
            },
        })
    }
};

//AppInput.propTypes = {
    //inputLabel: React.PropTypes.string,
    //placeholder: React.PropTypes.string
//};

export default FormSearch;
