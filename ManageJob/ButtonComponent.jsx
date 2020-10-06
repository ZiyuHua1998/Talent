import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';



export default class ButtonComponent extends Component {

    constructor(props) {
        super(props)
    
    }
    



    render() {
        return (
 
            <Button 
            basic color = {this.props.color}
            floated="right"
            onClick = {this.props.handleButtonClick}
            size='mini'
            >
            <Icon name={this.props.icon} />
            {this.props.buttonText}
            </Button>
        )
    }
}


