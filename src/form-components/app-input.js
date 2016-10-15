import React, { Component } from 'react';
import './app-input.css';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class AppInput extends Component {

    constructor (props) {
        super(props);
    }

    render() {
        return (
            <FormGroup controlId="formInlineName" className="app-input">
                <ControlLabel>{this.props.inputLabel}</ControlLabel>
                <FormControl type="text" placeholder={this.props.placeholder} />
            </FormGroup>
        );
    }
}

AppInput.propTypes = {
    inputLabel: React.PropTypes.string,
    placeholder: React.PropTypes.string
};

export default AppInput;
