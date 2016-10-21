import React, { Component } from 'react';
import './results-page.css';
import Header from '../Header';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

var books = [
    {
        id: 1,
        name: "Book1",
        author: "author1"
    },{
        id: 2,
        name: "Book2",
        author: "author2"
    },{
        id: 3,
        name: "ASASAS",
        author: "author3"
    },{
        id: 4,
        name: "Gera maracatos",
        author: "author4"
    },{
        id: 5,
        name: "Blinkt maracatos",
        author: "author5"
    },{
        id: 7,
        name: "Blinkt puntaso",
        author: "author5"
    },{
        id: 6,
        name: "Lobo putaso",
        author: "author6"
    }
];

class ResultsPage extends Component {
    /*constructor(props) {
        super(props)

        // this.state = {
        //     name: this.props.location.query.name
        // }
    }*/

	render() {
        const {location: {query}} = this.props;

        return (
        	<div className="App">
                <Header />
	        	<BootstrapTable data={books} striped={true} hover={true}>
                    <TableHeaderColumn dataField="id" isKey={true}>Book ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="name" filter={{ type: 'TextFilter', defaultValue: query.name }}>Book Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="author" filter={{ type: 'TextFilter', defaultValue: query.author }}>Book Author</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
};

export default ResultsPage;
