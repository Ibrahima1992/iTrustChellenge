import React from 'react';

import { Col,Row } from 'react-bootstrap';

import AddEvent from './add'
import EventsList from './list'

import './index.css'

class Event extends React.Component {

    constructor(props){
        super(props)
        
        this.state = {
            event : null
        }
    }

    onUpdateEvent = (event) => {
        this.setState({
            event: event
        })
    }
    
    onEventUpdated = () => {
        this.setState({
            event: null
        })
    }

    render() {
        const {event} = this.state

        return (
            <Row>
                <Col xs={12}>
                    <AddEvent event_ = {event}  onEventUpdated = {this.onEventUpdated }  />
                </Col>        
                <Col xs={12}  className = "events-list">
                    <EventsList onUpdateEvent = { (event) => this.onUpdateEvent(event) }  />
                </Col>
            </Row>
        )
    }
}

export default Event;
