import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';

import config from '../../config/config';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import Card from '../Card/Card';
import CardHeader from '../Card/CardHeader';
import CardBody from '../Card/CardBody';
import CardFooter from '../Card/CardFooter';
import CardIcon from '../Card/CardIcon';
import Button from '../CustomButtons/Button';
import Add from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan';
import PhoneIcon from '@material-ui/icons/Phone';
import MapIcon from '@material-ui/icons/Map';
import ValidationInput from '../ValidationInput';
import DateInput from '../DateInput';
import SelectInput from '../SelectInput';
import Snackbar from '../Snackbar/Snackbar';
import Address from '../Address';
import './EditCustomer.css';
import Phone from '../Phone';
import CustomDialog from '../CustomDialog';
import AddressService from '../../containers/AddressService';
import PhoneService from '../../containers/PhoneService';
import store from '../../store';

class EditCustomer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            documentTypes: [],
            documents: [],
            name: '',
            lastName: '',
            document: '',
            documentType: '',
            email: '',
            birthDate: '',
            alertColor: 'info',
            alertMessage: '',
            alertOpen: false,
            personId: '',
            openAddress: false,
            openPhone: false,
            deleteAlert: false,
            address: null,
            phone: null
        }
    }

    componentWillMount() {
        this.findCustomer();

        if (this.props.documentTypes && this.props.documentTypes.length > 0) {
            const documentTypes = this.formatDocumentTypes(this.props.documentTypes)
            this.setState({
                documentTypes,
                documents: this.props.documentTypes,
            })
        } else {
            this.getDocumentTypes()
        }
    }

    componentWillReceiveProps(next) {
        if (next.documentTypes) {
            const documentTypes = this.formatDocumentTypes(next.documentTypes)
            this.setState({
                documentTypes,
                documents: next.documentTypes,
            })
        }
    }

    formatDocumentTypes(documentTypes) {
        let result = []
        documentTypes.map(d => {
            result.push({
                id: d.idTypeId,
                value: d.name + " - " + d.type
            })
        })
        return result;
    }

    getDocumentTypes() {
        fetch(`${window._env_.REACT_APP_API_URL}/api/idTypes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-itlg-companyId': localStorage.getItem('itlg_default_company_id'),
            }
        })
            .then(response => response.json())
            .then(data => {
                this.props.onGetDocumentTypes(data);
            })
    }

    findDocumentType(id) {
        let type = {};
        this.state.documents.map(d => {
            if (id === d.idTypeId) {
                type = d;
                return;
            }
        })
        return type;
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

    saveCustomer() {
        if (this.state.name && this.state.lastName
            && this.state.document && this.state.documentType !== "0"
            && this.state.email && this.state.birthDate) {
                fetch(`${window._env_.REACT_APP_API_URL}/api/customer`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        avatarUrl: "",
                        id: this.state.document,
                        birthdate: this.state.birthDate,
                        email: this.state.email,
                        firstName: this.state.name,
                        idType: this.findDocumentType(this.state.documentType),
                        lastName: this.state.lastName,
                        personId: this.state.personId,
                        metadata: {},
                        verificationId: 0,
                        qr: "",

                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'x-itlg-companyId': localStorage.getItem('itlg_default_company_id'),
                        
                    }
                })
                .then(response => response.json())
                .then(data => {
                    this.props.onEditCustomer(data)
                    this.openAlert('success', 'Paciente agrgado con éxito.')
                })
            } else {
                this.openAlert('warning', 'Hay campos requeridos sin información. Complete todos los datos requeridos.')
            }
    }

    handleValue(value, state) {
        this.setState({
            [state]: value
        })
    }

    findCustomer() {
        fetch(`${window._env_.REACT_APP_API_URL}/api/customer/${this.props.routeParams.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-itlg-companyId': localStorage.getItem('itlg_default_company_id'),
            }
        })
            .then(response => response.json())
            .then(customer => {
                this.setState({
                    name: customer.firstName,
                    lastName: customer.lastName,
                    birthDate: customer.birthdate,
                    email: customer.email,
                    document: customer.id || '',
                    documentType: customer.idType.idTypeId,
                    personId: customer.personId,
                })
            })
    }

    createAddress() {
        this.setState({
            openAddress: true,
            address: null,
        })
    }

    createPhone() {
        this.setState({
            openPhone: true,
            phone: null,
        })
    }

    editAddress(address) {
        this.setState({
            openAddress: true,
            address,
        })
    }

    editPhone(phone) {
        this.setState({
            openPhone: true,
            phone,
        })
    }

    render() {
        return (
            <div className="edit-customer">
                <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
                        <Card>
                            <CardHeader color="success" icon>
                                <CardIcon color="success">
                                    <EditIcon />
                                </CardIcon>
                                <h4 className="card-icon-title">Datos de Perfil</h4>
                            </CardHeader>
                            <CardBody className="edit-customer-form">
                                <form>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <ValidationInput text="Nombre *" onChangeValue={(value) => this.handleValue(value, 'name')} value={this.state.name} invalid={this.state.name === ''} />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <ValidationInput text="Apellido *" onChangeValue={(value) => this.handleValue(value, 'lastName')} value={this.state.lastName} invalid={this.state.lastName === ''} />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <SelectInput text="Tipo de Documento *" elements={this.state.documentTypes} onSelectedValue={(value) => this.handleValue(value, 'documentType')} value={this.state.documentType} invalid={this.state.documentType === ''} />
                                            </GridItem>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <ValidationInput text="Nro de Documento *" type="number" onChangeValue={(value) => this.handleValue(value, 'document')} value={this.state.document} invalid={this.state.document === ''} />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <DateInput text="Fecha de Nacimiento *" onChangeValue={(value) => this.handleValue(value, 'birthDate')} value={this.state.birthDate} invalid={this.state.birthDate === ''} />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <ValidationInput text="Correo Electrónico *" type="email" onChangeValue={(value) => this.handleValue(value, 'email')} value={this.state.email} invalid={this.state.email === ''} />
                                        </GridItem>
                                    </GridContainer>
                                </form>
                            </CardBody>
                            <CardFooter className="edit-customer-submit">
                                <Button color="info" onClick={() => this.saveCustomer()}>
                                    Guardar Paciente
                                </Button>
                            </CardFooter>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <Card>
                            <CardHeader color="rose" icon>
                                <CardIcon color="rose">
                                    <SettingsOverscanIcon />
                                </CardIcon>
                                <h4 className="card-icon-title">Código QR</h4>
                            </CardHeader>
                            <CardBody className="edit-customer-qr text-center">
                                <QRCode
                                    id={this.state.personId}
                                    value={`{"personId":${this.state.personId}}`}
                                    size={250}
                                    level={"L"}
                                    includeMargin={true}
                                    renderAs={"canvas"}//svg
                                /> 
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="danger" icon>
                                <CardIcon color="danger">
                                    <MapIcon />
                                </CardIcon>
                                <h4 className="card-icon-title">Direcciones</h4>
                            </CardHeader>
                            <CardBody >
                                <Address personId={this.state.personId}  onEditAddress={(address) => this.editAddress(address)} />
                                <Button className="edit-customer-create" color="success" onClick={() => this.createAddress()}>
                                    <Add />
                                    Crear Dirección
                                </Button>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader color="info" icon>
                                <CardIcon color="info">
                                    <PhoneIcon />
                                </CardIcon>
                                <h4 className="card-icon-title">Teléfonos</h4>
                            </CardHeader>
                            <CardBody >
                                <Phone personId={this.state.personId} onEditPhone={(phone) => this.editPhone(phone)}/>
                                <Button className="edit-customer-create" color="success" onClick={() => this.createPhone()}>
                                    <Add />
                                    Crear Teléfono
                                </Button>
                            </CardBody>
                        </Card>
                        <Snackbar
                            place="tr"
                            color={this.state.alertColor}
                            message={this.state.alertMessage}
                            open={this.state.alertOpen}
                        />
                        { this.state.personId &&
                        <CustomDialog title={"Dirección"} open={this.state.openAddress} onClose={() => this.setState({address: null, openAddress: false})}>
                            <AddressService edit={this.state.address} personId={this.state.personId} onAddressSubmited={() => this.setState({address: null, openAddress: false})} />
                        </CustomDialog>
                        }
                        { this.state.personId &&
                        <CustomDialog title={"Teléfono"} open={this.state.openPhone} onClose={() => this.setState({phone: null, openPhone: false})} >
                            <PhoneService edit={this.state.phone} personId={this.state.personId} onPhoneSubmited={() => this.setState({phone: null, openPhone: false})}/>
                        </CustomDialog>
                        }
                    </GridItem>
                </GridContainer>
            </div>
        )
    }
}

EditCustomer.propTypes = {
    onGetDocumentTypes: PropTypes.func.isRequired,
    onEditCustomer: PropTypes.func.isRequired,
}

export default EditCustomer;
