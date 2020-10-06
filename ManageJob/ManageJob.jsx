import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import { Icon, Dropdown, Checkbox, Accordion, Form, Segment, Card, Modal, Button, Label} from 'semantic-ui-react';
import ButtonComponent from './ButtonComponent.jsx';
import PaginationComponent from './PaginationComponent.jsx';
import moment from 'moment';


export default class ManageJob extends React.Component {
    constructor(props) {
        super(props);
        let loader = loaderData
        loader.allowedUsers.push("Employer");
        loader.allowedUsers.push("Recruiter");
        //console.log(loader)
        
        this.state = {
            loadJobs: [],
            postedJobs: [],
            loaderData: loader,

            activePage: 1,
            perPage: 6,
            totalPages: 0,
            

            sortBy: {
                date: "desc"
            },

            filter: {
                
                showActive: true,
                showDraft: true,

                showClosed: false,
                showExpired: false,
                showUnexpired: false
        
            },

            targetJobs: [],

            activeIndex: ""
        }
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.loadNewData = this.loadNewData.bind(this);
        //your functions go here
        this.closeJob = this.closeJob.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleDropDownChange = this.handleDropDownChange.bind(this);
        this.handleSortByDateChange = this.handleSortByDateChange.bind(this);

        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.Expired = this.Expired.bind(this);
        this.UnExpired = this.UnExpired.bind(this);
    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });//comment this

        //set loaderData.isLoading to false after getting data
        //this.loadData(() =>
        //    this.setState({ loaderData })
        //)
        
        //console.log(this.state.loaderData)
    }

    componentDidMount() {
        this.init();
        this.loadData();


        //For testing
        let a=moment().format("YYYY-MM-DD HH:mm:ss");
        let b = "2020-11-26T04:42:46Z";
        console.log(a>b ? 'a>b' : 'a<b');
        console.log();
    };




    
    loadData(callback) {
        
        var cookies = Cookies.get('talentAuthToken');
        let urlGetJobs = 'http://localhost:51689/listing/listing/getEmployerJobs';

        let urlGetSortedJobs = 'http://localhost:51689/listing/listing/getSortedEmployerJobs';


       $.ajax({ 

        url: urlGetJobs,
        //url: urlGetSortedJobs,
        headers: {
            'Authorization': 'Bearer ' + cookies,
            'Content-Type': 'application/json'
        },
        type: "GET",
        contentType: "application/json",

        // data:
        // {
        //     //activePage: this.state.activePage,
        //     sortbyDate: this.state.sortBy.date,
        //     showActive: true,

        //     showClosed: true,
        //     showExpired: true,
        //     showUnexpired: true
        // },

        dataType: "json",
        cache: false,
        success: function(response) {
            //let jobsData = null;
            console.log(response)
            
            if (response.myJobs) {

                this.setState({
                    postedJobs: response.myJobs
                })
                console.log("Employer Jobs: ", this.state.postedJobs)

                //console.log(response.myJobs[0].expiryDate.format('YYYY-MM-DD'));
            }
            
        }.bind(this),
        error: function (error) {
            console.log(error)
        }
    }) 

    }



    //Close/Change status of a job
    closeJob(jobId)
    {
        var cookies = Cookies.get('talentAuthToken');

       $.ajax({
        url: 'http://localhost:51689/listing/listing/CloseJob',
        headers: {
            'Authorization': 'Bearer ' + cookies,
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(jobId),
        contentType: "application/json",
        dataType: "json",
        cache: false,
        success: function(response) {
            
            console.log(jobId);
            console.log("Message: "+JSON.stringify(response))
            window.history.go(0);
            this.loadData();

            
        },
        error: function(err) {
            console.log(err)
        }
    }) 
    }



    loadNewData(data) {
        var loader = this.state.loaderData;
        loader.isLoading = true;
        data[loaderData] = loader;
        this.setState(data, () => {
            this.loadData(() => {
                loader.isLoading = false;
                this.setState({
                    loadData: loader
                })
            })
        });
    }



    // To Be Continued

    // loadFilteredData()
    // {
          
    //     var cookies = Cookies.get('talentAuthToken');
    //     let urlGetSortedJobs = 'http://localhost:51689/listing/listing/getSortedEmployerJobs';

    //    $.ajax({ 

    //     url: urlGetSortedJobs,
    //     headers: {
    //         'Authorization': 'Bearer ' + cookies,
    //         'Content-Type': 'application/json'
    //     },
    //     type: "GET",
    //     contentType: "application/json",

    //     data:
    //     {
    //         //activePage: this.state.activePage,
    //         sortbyDate: this.state.sortBy.date,
    //         showActive: true,

    //         showClosed: true,
    //         showExpired: true,
    //         showUnexpired: true
    //     },


    //     dataType: "json",
    //     cache: false,
    //     success: function(response) {
            
    //         console.log(response)
            
    //         if (response.myJobs) {

    //             this.setState({
    //                 postedJobs: response.myJobs
    //             })
    //             console.log("Employer Posted Jobs: ", this.state.postedJobs)
    //         }
            
    //     }.bind(this),
    //     error: function (error) {
    //         console.log(error)
    //     }
    // }) 
    // }


    // To Be Continued
    //Handle onChange in filter dropdown list
    handleFilterChange(e, {value})
    {
        let allJobs = this.state.postedJobs;
        let filteredJobs = [];

        switch(value)
        {
            case 'all':
                
                window.location = '/ManageJobs'
                
            break
            

            case 'active':
                allJobs.map(
                    (job)=>{
                    
                    if(job.status == 0)
                    {
                        filteredJobs.push(job)
                    }
                    
                })
                this.setState({
                    postedJobs : filteredJobs
                })
            break
            
            
            // case 'closed':
            //     allJobs.map(
            //         (job)=>{
                    
            //         if(job.status == 1)
            //         {
            //             filteredJobs.push(job)
            //         }
            //     })
            //     this.setState({
            //         postedJobs : filteredJobs
            //     })
            // break
            
        }
    }


   //Handle active page change once click on the pagination
    handlePageChange(e, {activePage})
    {
        this.setState({
            activePage: activePage
        })
    }
    

    //Handle the dropdown list of the limitation of how many rows/cards per page
    handleDropDownChange(e, {value})
    {
        this.setState({
            perPage: value
        })
    }


    //Handle once change sort by date drop down list
    handleSortByDateChange(e, {value})
    {
        this.setState({
            sortBy:{
                date: value
            }
        })
    }





    //Return expired label when job expired
    Expired()
    {
        return(
            <Label 
            color='red'
            icon='dont'
            content='Expired'
            />
        )
    }

    //Return unExpired label when job unexpired
    UnExpired()
    {
        return(
            <a><Icon name='user' />99 applied</a>
        )
    }


    
    render()
    {
        const filterOptions=[

            {
                key: 'showAll',
                text: 'Show All',
                value: 'all'
            },

            {
                key: 'showActive',
                text: 'Active Jobs',
                value: 'active'
            },
            
            {
                key: 'showClosed',
                text: 'Closed Jobs',
                value: 'closed'
            },

            {
                key: 'showExpired',
                text: 'Expired Jobs',
                value: 'expired'
            },

            {
                key: 'showUnexpired',
                text: 'Unexpired Jobs',
                value: 'unexpired'
            },
        ]

        const orderByOptions = [
            {
                key: 'desc',
                text: 'Newest',
                value: 'desc'
            },
            {
                key: 'not desc',
                text: 'Default',
                value: 'default'
            }
        ]
        

        return(
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
            <div className ="ui container">
            <h1>List of Jobs</h1>

            <span>
                <Icon name='filter'/>
                Filter:
            <Dropdown
            placeholder='Choose Filter'
            options= {filterOptions}
            selection
            button
            onChange={this.handleFilterChange}
            />
            </span>


            <span>
                <Icon name='calendar'/>
                Sort By Date: 
            <Dropdown 
            placeholder='Sort By'
            options= {orderByOptions}
            selection
            button
            />
            </span>

            <br/><br/>

            {this.state.postedJobs.length>0 ? this.renderHaveJob() : this.renderNoJob()}

            </div>
            </BodyWrapper>

            
        )
    }


    //jobOpen(id, expireDate)
    jobOpen(id, expireDate)
    {
        const currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss");
        
        return(
            <div>
                            <Button basic color="blue"
                            href={"/EditJob/"+id}
                            floated="right"
                            size='mini'
                            >
                            <Icon name="edit"/>
                            Edit   
                            </Button>
                            


                            <Modal
                            trigger= {<Button basic color="blue" floated="right" size='mini'><Icon name="close"/>Close</Button>}
                            size="small"
                            >
                            <Modal.Header>Close Job</Modal.Header>
                            <Modal.Content>
                                <b>Do you wish to close this job?</b>

                                <div>
                                    <ButtonComponent 
                                    color="black"
                                    icon="cancel"
                                    buttonText="Cancel"
                                    handleButtonClick={()=>window.history.go(0)}
                                    />

                                    <ButtonComponent color="blue"
                                    icon="close"
                                    buttonText="Close this Job"
                                    handleButtonClick={()=>this.closeJob(id)}
                                    />

                                </div>
                                <br/><br/>

                            </Modal.Content>
                            </Modal>

                            <Button basic color="blue"
                            href={"/PostJob/"+id}
                            floated="right"
                            size='mini'
                            >
                            <Icon name="copy"/>
                            Copy   
                            </Button>
            
                    {currentDateTime >= expireDate ? this.Expired() : this.UnExpired()}
                    
            </div>
        )
    }


    //Display on closed job cards
    jobClosed()
    {
        return(
            <a><Icon name='delete calendar' />Closed</a>
        )
    }


    
    renderHaveJob() {

        let jobs = this.state.postedJobs;
        console.log(jobs);


        const indexOfLastPost = this.state.activePage * this.state.perPage;
        const indexOfFirstPost = indexOfLastPost - this.state.perPage;
        const currentPagePosts = jobs.slice(indexOfFirstPost, indexOfLastPost);
        const totalPageNum = Math.ceil(this.state.postedJobs.length/this.state.perPage)


        const options = [
            {
                key: '3',
                text:'3 records per page',
                value:3
            },
            {
                key: '6',
                text:'6 records per page',
                value:6
            },
            {
                key: '9',
                text:'9 records per page',
                value:9
            },
            {
                key: '12',
                text:'12 records per page',
                value:12
            },
            {
                key: '15',
                text:'15 records per page',
                value:15
            },
            {
                key: '18',
                text:'18 records per page',
                value:18
            }
        ]

        


        return (
            
               <div className ="ui container">

                
               <Card.Group itemsPerRow={3}>
                   
                {
                   
                    currentPagePosts.map( (item)=>{
                        return(

                            <JobSummaryCard 
                            title={item.title}
                            location={item.location.country+', '+item.location.city}
                            summary={item.summary}
                            extra={
                            <div>
                            
                            {item.status==1 ? this.jobClosed() : this.jobOpen(item.id, item.expiryDate)}

                            </div>
                            }
                            />
                        )
                    }) 
                }



               </Card.Group>

               <br/><br/><br/>

               <Dropdown 
               placeholder='Please select'
               selection
               options={options}
               onChange={this.handleDropDownChange}
               />

               <PaginationComponent 
                activePage={this.state.activePage}
                totalPage={totalPageNum} 
                siblingRange={1}
                handlePageChange={this.handlePageChange}
                />
 
                <br/><br/><br/>

               </div>
               
        )
    }


    renderNoJob()
    {
    return(
            
                <div className ="ui container">

                    <h3>No Jobs Found</h3>

                <br/>
                </div>
            
        )
    }




} 


