import React, { Component } from 'react';
import './results-page.css';
import Header from '../Header';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

var books = [
    {
        id: 1,
        name: "Book1",
        author: "author1",
        description: "se la re come"
    },{
        id: 2,
        name: "Book2",
        author: "author2",
        description: "se la come"
    },{
        id: 3,
        name: "ASASAS",
        author: "author3",
        description: "se la lastra"
    },{
        id: 4,
        name: "Gera maracatos",
        author: "author4",
        description: "se la mastica"
    },{
        id: 5,
        name: "Blinkt maracatos",
        author: "author5",
        description: "se la re lastra"
    },{
        id: 7,
        name: "Blinkt puntaso",
        author: "author5",
        description: "se la manduca"
    },{
        id: 6,
        name: "Lobo putaso",
        author: "author6",
        description: "se la re manduca"
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
                    <TableHeaderColumn dataField="name" filter={{ type: 'TextFilter', defaultValue: query.name }}>Título</TableHeaderColumn>
                    <TableHeaderColumn dataField="author" filter={{ type: 'TextFilter', defaultValue: query.author }}>Autor</TableHeaderColumn>
                    <TableHeaderColumn dataField="description" filter={{ type: 'TextFilter', defaultValue: query.description }}>Descripción</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
};

export default ResultsPage;
