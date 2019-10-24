import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CreatePhone.css';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import ValidationInput from '../ValidationInput';
import Button from '../CustomButtons/Button';
import Snackbar from '../Snackbar/Snackbar';
import config from '../../config/config';
import SelectInput from '../SelectInput';
import store from '../../store';

class CreatePhone extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            number: '',
            phoneTypes: [],
            types: [],
            alertColor: '',
            alertOpen: '',
            alertMessage: '',
            phoneType: '',
        }
    }

    componentWillMount() {
        if (this.props.phoneTypes && this.props.phoneTypes.length) {
            const phoneTypes = this.formatPhoneTypes(this.props.phoneTypes)
            this.setState({
                phoneTypes,
                types: this.props.phoneTypes,
            })
        } else {
            this.getPhoneTypes()
        }

        if (this.props.edit) {
            this.setState({
                number: this.props.edit.number,
                phoneType: this.props.edit.phoneType.phoneTypeId,
            })
        }
    }

    componentWillReceiveProps(next) {
        if (next.phoneTypes) {
            const phoneTypes = this.formatPhoneTypes(next.phoneTypes)
            this.setState({
                phoneTypes,
                types: next.phoneTypes,
            })
        }
    }

    componentWillUnmount() {
        this.setState({
            name: '',
            number: '',
            phoneTypes: [],
            types: [],
            alertColor: '',
            alertOpen: '',
            alertMessage: '',
            phoneType: '',
        })
    }

    formatPhoneTypes(phoneTypes) {
        const result = [];
        phoneTypes.map(p => {
            result.push({
                id: p.phoneTypeId,
                value: p.name,
            })
        })
        return result;
    }

    getPhoneTypes() {
        fetch(`${window._env_.REACT_APP_API_URL}/api/phoneTypes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-itlg-companyId': localStorage.getItem('itlg_default_company_id'),
            }
        })
            .then(response => response.json())
            .then(phoneTypes => {
                this.props.onGetPhoneTypes(phoneTypes);
            })
    }

    handleValue(value, state) {
        this.setState({
            [state]: value
        });
    }

    savePhone() {
        if (this.props.edit) {
            this.patchPhone()
        } else {
            this.postPhone()
        }
    }

    postPhone() {
        if (this.state.phoneType && this.state.number) {
            fetch(`${window._env_.REACT_APP_API_URL}/api/persons/${this.props.personId}/phone`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-itlg-companyId': localStorage.getItem('itlg_default_company_id')
                },
                body: JSON.stringify({
                    number: this.state.number,
                    personId: this.props.personId,
                    phoneType: this.findPhoneType(this.state.phoneType)
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.phoneId) {
                        this.openAlert('success', 'Teléfono agregado con éxito.')
                        this.props.onPhoneSubmited(data)
                    } else {
                        this.openAlert('danger', data.message)
                    }
                })
        } else {
            this.openAlert('warning', 'Hay campos requeridos sin información. Complete todos los datos.')
        }
    }

    patchPhone() {
        if (this.state.phoneType && this.state.number) {
            fetch(`${window._env_.REACT_APP_API_URL}/api/persons/${this.props.personId}/phone/${this.props.edit.phoneId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-itlg-companyId': localStorage.getItem('itlg_default_company_id')
                },
                body: JSON.stringify({
                    phoneId: this.props.edit.phoneId,
                    number: this.state.number,
                    personId: this.props.personId,
                    phoneType: this.findPhoneType(this.state.phoneType)
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.phoneId) {
                        this.openAlert('success', 'Teléfono agregado con éxito.')
                        this.props.onPhoneSubmited(data)
                    } else {
                        this.openAlert('danger', data.message)
                    }
                })
        } else {
            this.openAlert('warning', 'Hay campos requeridos sin información. Complete todos los datos.')
        }
    }

    findPhoneType(id) {
        let phoneType = {}
        this.state.types.map(t => {
            if (t.phoneTypeId === id) {
                phoneType = t
                return;
            }
        })
        return phoneType;
    }

    openAlert(color, message) {
        this.setState({
            alertColor: color,
            alertMessage: message,
            alertOpen: true,
        })

        setTimeout(() => {
            this.setState({ alertOpen: false })
        }, 2000)
    }

    render() {
        return (
            <GridContainer xs={12}>
                <GridItem xs={12} sm={6}>
                    <ValidationInput type="number" text="Teléfono *" value={this.state.number} onChangeValue={(value) => this.handleValue(value, 'number')} invalid={this.state.number === ''}/>
                </GridItem>
                <GridItem xs={12} sm={6}>
                    <SelectInput text="Tipo *" elements={this.state.phoneTypes} value={this.state.phoneType} onSelectedValue={(value) => this.handleValue(value, 'phoneType')} invalid={this.state.phoneType === ''}/>
                </GridItem>
                <hr className="divider-root divider-light" />
                <GridItem xs={12}>
                    <Button className="create-address-submit" color="info" text="" onClick={() => this.savePhone()}>
                        Guardar Teléfono
                    </Button>
                    <Snackbar
                        place="tr"
                        color={this.state.alertColor}
                        message={this.state.alertMessage}
                        open={this.state.alertOpen}
                    />
                </GridItem>
            </GridContainer>
        )
    }
}

CreatePhone.propTypes = {
    personId: PropTypes.number,
    phoneTypes: PropTypes.array,
    onGetPhoneTypes: PropTypes.func,
    onPhoneSubmited: PropTypes.func,
    edit: PropTypes.any,
}

export default CreatePhone;
