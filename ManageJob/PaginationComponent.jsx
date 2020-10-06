import {Icon, Pagination} from 'semantic-ui-react';
import React, { Component } from 'react';

export default class PaginationComponent extends Component {

    constructor(props) {
        super(props)
    
    }
    









    render() {
        return (
            
            <Pagination 
            
            totalPages={this.props.totalPage} 
            siblingRange={this.props.siblingRange} //0 or 1
            onPageChange={this.props.handlePageChange} //A func
            activePage={this.props.activePage}

            size='small'
            boundaryRange={0}
            floated='right'
            />


           
        )
    }
}

