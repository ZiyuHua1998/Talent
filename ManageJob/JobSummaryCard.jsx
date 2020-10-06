import React from 'react';
import Cookies from 'js-cookie';
import { Popup, Card, Icon, Button} from 'semantic-ui-react';
import moment from 'moment';

//import ButtonComponent from './ButtonComponent';

export class JobSummaryCard extends React.Component {
    constructor(props) {
        super(props);
        this.selectJob = this.selectJob.bind(this)
    }

    selectJob(id) {
        var cookies = Cookies.get('talentAuthToken');
        //url: 'http://localhost:51689/listing/listing/closeJob',
    }



    render() {

        return(

            <Card 
            
            
                header={this.props.title}
                meta={this.props.location}
                description={this.props.summary}
                extra={this.props.extra}
                
                // <a>
                //     <Icon name='user' />
                //     15 has applied(Just for demo)
                // </a>
  
                //}
            />

        )



    }
} 