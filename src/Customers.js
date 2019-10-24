import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router';
import GridContainer from "../Grid/GridContainer.jsx";
import GridItem from "../Grid/GridItem.jsx";
import Card from '../Card/Card';
import CardHeader from '../Card/CardHeader';
import CardBody from '../Card/CardBody';
import CardIcon from '../Card/CardIcon';
import Table from "../Table/Table";
import CustomInput from '../CustomInput/CustomInput';
import Button from '../CustomButtons/Button';
import Person from '@material-ui/icons/Person';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Add from '@material-ui/icons/Add';
import CloudDownload from '@material-ui/icons/CloudDownload';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';
import config from '../../config/config.js';
import PdfCustomer from "../PdfCustomer";
import './Customers.css';
import { withTranslation } from 'react-i18next';

class Customers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customers: [],
            address: [],
            personAddress: [],
            loading: false,
        }
    }

    componentWillMount() {
        if (this.props.address) {
            this.setState({
                address: this.props.address
            }, () => {
                this.props.customers && this.formatCustomers(this.props.customers)
            })
        }

        if (this.props.customers) {
            this.formatCustomers(this.props.customers)
        } else {
            this.getCustomers()
        }
    }

    componentWillReceiveProps(next) {
        if (next.customers) {
            this.formatCustomers(next.customers)
        }

        if (next.address) {
            this.setState({
                address: next.address
            })
        }
    }

    getAddress() {
        fetch(`${window._env_.REACT_APP_API_URL}/api/address`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-itlg-companyId': localStorage.getItem('itlg_default_company_id'),
            }
        })
            .then(response => response.json())
            .then(data => {
                this.props.onGetAddress(data);
                if (!this.props.customers) {
                    this.getCustomers()
                }
            })
    }

    getCustomers() {
        fetch(`${window._env_.REACT_APP_API_URL}/api/customers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-itlg-companyId': localStorage.getItem('itlg_default_company_id'),
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    loading: false,
                })
                if (data && data.length) {
                    this.props.onGetCustomers(data);
                }
            })
            .catch(e => {
                this.setState({
                    loading: false,
                })
            })
    }

    exportPdfCustomer = (customer) => {
        // change this number to generate more or less rows of data
        PdfCustomer(customer);
    }

    formatCustomers(customers) {
        let data = customers.map(c => {
            return {
                lastName: c.lastName,
                firstName: c.firstName,
                phone: c.phone && c.phone[0] ? c.phone[0].number : '',
                address: this.findPersonAddress(c.personId),
                id: c.id,
                email: c.email,
                age: moment().diff(c.birthdate, 'years', false),
                actions: <div className="customers-actions"><Tooltip title="Historia"><div><Button simple justIcon color="info" onClick={() => this.customerHistory(c.personId)}><Person /></Button></div></Tooltip>
                <Tooltip title="Editar"><div><Button simple justIcon color="success" onClick={() => browserHistory.push(`/editar-paciente/${c.personId}`)}><Edit /></Button></div></Tooltip>
                <Tooltip title="Exportar"><div><Button simple justIcon color="warning" onClick={() => this.exportPdfCustomer(c)}><CloudDownload /></Button></div></Tooltip>
                <Tooltip title="Eliminar"><div><Button simple justIcon color="danger" onClick={() => this.customerHistory(c.personId)}><Delete /></Button></div></Tooltip></div>
            }
        })

        this.setState({
            customers: data
        })
    }

    handleLastName(e) {

        const lastName = e.target.value

        const data = this.props.customers.filter(c => {
            return c.lastName.toLowerCase().indexOf(lastName.toLowerCase()) !== -1;
        })
        return this.formatCustomers(data);
    }

    handleFirstName(e) {
        const firstName = e.target.value

        const data = this.props.customers.filter(c => {
            return c.firstName.toLowerCase().indexOf(firstName.toLowerCase()) !== -1
        })

        return this.formatCustomers(data);
    }

    handleDocument(e) {
        const doc = e.target.value
        
        const data = this.props.customers.filter(c => {
            return c.id.toString().indexOf(doc) !== -1
        });

        return this.formatCustomers(data);
    }

    customerHistory(id) {
        browserHistory.push(`/historial/${id}`);
    }

    findPersonAddress(personId) {
        let address = '';
        if (this.state.personAddress && this.state.personAddress.length) {
            this.state.personAddress.map(pa => {
                if (pa.personId === personId) {
                    this.state.address.map(a => {
                        if (pa.addressId === a.addressId) {
                            address = a.address
                        }
                    })
                }
            })
        }

        return address;
    }

    render() {
        const { t } = this.props
        return (
            <div className="customers">
                    <GridContainer >
                        <GridItem xs={12}>
                        <Card>
                            <CardHeader color="info" icon>
                                <CardIcon color="info">
                                    <Person />
                                </CardIcon>
                                <Button className="customers-button" round justIcon color="success" onClick={() => browserHistory.push('nuevo-paciente')}>
                                    <Add className="customers-button-icon" />
                                </Button>
                                <div className="customers-filters customers-filters-row">
                                    <CustomInput
                                        labelText={t("customers.input.last_name")}
                                        id="lastName"
                                        formControlProps={{
                                            fullWidth: false,
                                        }}
                                        onChange={(e) => this.handleLastName(e)}
                                    />
                                    <CustomInput
                                        labelText={t("customers.input.first_name")}
                                        id="firstName"
                                        formControlProps={{
                                            fullWidth: false,
                                        }}
                                        onChange={(e) => this.handleFirstName(e)}
                                    />
                                    <CustomInput
                                        labelText={t("customers.input.id")}
                                        id="doc"
                                        type="number"
                                        formControlProps={{
                                            fullWidth: false,
                                        }}
                                        onChange={(e) => this.handleDocument(e)}
                                    />
                                </div>
                            </CardHeader>
                            <CardBody className="appointments-content-body">
                                <Table
                                    striped
                                    loading={this.state.loading}
                                    tableHeaderColor="primary"
                                    tableHead={[
                                        { Header: t("customers.table.last_name"), accessor: 'lastName'},
                                        { Header: t("customers.table.first_name"), accessor: 'firstName'},
                                        { Header: t("customers.table.id"), accessor: 'id'},
                                        { Header: t("customers.table.email"), accessor: 'email'},
                                        { Header: t("customers.table.actions"), accessor: 'actions', sortable: false}
                                    ]}
                                    tableData={this.state.customers}
                                    colorsColls={["primary"]}
                                />
                            </CardBody>
                        </Card>
                        </GridItem>
                    </GridContainer>
            </div>
        )
    }
}

Customers.propTypes = {
    onGetCustomers: PropTypes.func.isRequired,
    onGetAddress: PropTypes.func.isRequired,
    onGetPersonAddress: PropTypes.func.isRequired,
    customers: PropTypes.array,
    address: PropTypes.array,
    personAddress: PropTypes.array,
}

export default withTranslation()(Customers);
