import React from 'react';

import {Table,Col,Row,Button} from 'react-bootstrap';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTrash } from '@fortawesome/free-solid-svg-icons'
import { deleteEvent } from './../../../actions/actionsEvent';

import './index.css'

class EventsList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
           events : props.events
        }
    }

    static getDerivedStateFromProps(props, state) {

        if (props.events !== state.events) {
            return {
                events : props.events
            };
        }
    
        return null;
    }

    handleUpdateClick = (event) => {
        this.props.onUpdateEvent(event)
    }

    handleDeleteClick = (event) => {
        this.props.deleteEvent(event)
    }

    render() {
        const {events} = this.state

        return (
        <Row>
            <Col xs={12}>
                <h3 className="titleEvent">{`${events.length} événement${events.length > 1 ? 's' : ''}`}</h3>
            </Col>        
            <Col xs={12}>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Lieu</th>
                            <th>Date / Heure</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            events.map(event => {

                                return (
                                    <tr key = {event.id}>
                                        <td>{event.nom}</td>
                                        <td>{event.lieu}</td>
                                        <td>{event.date.toLocaleString()}</td>
                                        <td>
                                            <Button variant="secondary" onClick = {() => this.handleUpdateClick(event) }> <FontAwesomeIcon icon={faEdit} /></Button>
                                            <Button className = "btnSup" onClick = {() => this.handleDeleteClick(event) }variant="danger"> <FontAwesomeIcon icon={faTrash} /></Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Col>
        </Row>

        )
    }
}

EventsList.defaultProps = {
    events : []
};

EventsList.propTypes = {
    events : PropTypes.array
};

const mapStateToProps = (state) => {
    return({
        events : state.event.events
    });
}

const mapDispatchToProps = dispatch => ({
    deleteEvent: (event) => dispatch(deleteEvent(event))
})

export default connect(mapStateToProps,mapDispatchToProps)(EventsList);