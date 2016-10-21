import React, { Component } from 'react';
import './form-search.css';
import { Form, FormGroup, ControlLabel, FormControl, Col, Button, ButtonToolbar } from 'react-bootstrap';

class FormSearch extends Component {

    //constructor (props) {
      //  super(props);
    //}

    render() {
        return (
            <Form horizontal className="form-search">
                <FormGroup controlId="formHorizontalTitle">
                    <Col componentClass={ControlLabel} sm={1}>
                        Titulo
                    </Col>
                    <Col sm={10}>
                        <FormControl type="titulo" placeholder="Titulo" />
                    </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalAuthor">
                    <Col componentClass={ControlLabel} sm={1}>
                        Autor
                    </Col>
                    <Col sm={10}>
                        <FormControl type="titulo" placeholder="Titulo" />
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
                    <Button type="submit">
                        Buscar
                    </Button>
                </ButtonToolbar>
            </Form>
        );
    }
};

//AppInput.propTypes = {
    //inputLabel: React.PropTypes.string,
    //placeholder: React.PropTypes.string
//};

export default FormSearch;
