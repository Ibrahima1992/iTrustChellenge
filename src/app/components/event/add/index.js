import React from 'react';

import { Form,Card,Button } from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import { addNewEvent } from './../../../actions/actionsEvent';
import { updateEvent } from './../../../actions/actionsEvent';

class AddEvent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id : props.id,
            nom : props.nom,
            lieu: props.lieu,
            date: props.date,
            validated: false,
            updating: false,
        }

        this.handleNomChange = this.handleNomChange.bind(this);
        this.handleLieuChange = this.handleLieuChange.bind(this);
        this.handleDateOnChange = this.handleDateOnChange.bind(this);
    }

    handleNomChange(event) {
        this.setState({nom: event.target.value})
    }

    static getDerivedStateFromProps(props, state) {
        if (props.event_ !== null && props.event_.nom !== state.nom  && props.event_.lieu !== state.lieu  && props.event_.date !== state.date && !state.updating) {
    
            return {
                id : props.event_.id,
                nom : props.event_.nom,
                lieu: props.event_.lieu,
                date: props.event_.date,
                updating: true
            };
        }
 
        return null;
    }

    handleLieuChange(event) {
        this.setState({lieu: event.target.value})
    }

    handleDateOnChange(date) {
        this.setState({date : date})
    }

    handleSubmit = event => {

        event.preventDefault();

        const form = event.currentTarget;

        this.setState({
            validated : true
        })    

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else
        {
            if (this.state.updating){
                this.props.updateEvent_({
                    id : this.state.id,
                    nom : this.state.nom,
                    lieu : this.state.lieu,
                    date : this.state.date
                })

                this.props.onEventUpdated()
            }
            else{
                this.props.addEvent({
                    nom : this.state.nom,
                    lieu : this.state.lieu,
                    date : this.state.date
                })
            }

            this.setState({
                id : '',
                nom : '',
                lieu: '',
                date: new Date(),
                validated: false,
                updating : false
            })  
        }    
    }

    handleReset = () => {

        this.setState({
            id : '',
            nom : '',
            lieu: '',
            date: new Date(),
            validated: false,
            updating : false
        }) 

        this.props.onEventUpdated()
    }

    render() {

        const {nom,lieu,validated,updating} = this.state;
        return (
            <Card>
                <Card.Body>
                    <Card.Title>{updating ? `Modification` : `Ajout`} d'un événement</Card.Title>
             
                        <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <Form.Label>Nom de l'événement * </Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={nom}
                                    onChange={this.handleNomChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Veuillez renseigner le nom
                                </Form.Control.Feedback>
                            </Form.Group>                            
                            <Form.Group>
                                <Form.Label>Lieu de l'événement *</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={lieu}
                                    onChange={this.handleLieuChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Veuillez renseigner le lieu
                                </Form.Control.Feedback>                                
                            </Form.Group>   
                            
                            <Form.Group>
                                <Form.Label>Date / Heure de l'événement *</Form.Label>

                                <br />
                                <DateTimePicker
                                    minDate = {new Date()}
                                    onChange={this.handleDateOnChange}
                                    value={this.state.date}
                                />
                            </Form.Group>

                            <Button type="submit" variant="secondary">{updating ? `Enregistrer` : `Ajouter`}</Button>
                            { updating ? <Button onClick = {this.handleReset} variant="default">Annuler</Button> : '' }
                        </Form>
               
                </Card.Body>
            </Card>
        )
    }
}

AddEvent.defaultProps = {
    nom : '',
    lieu: '',
    date: new Date()
};

AddEvent.propTypes = {
    nom : PropTypes.string,
    lieu: PropTypes.string,
    date: PropTypes.instanceOf(Date)
}

const mapDispatchToProps = dispatch => ({
    addEvent: (event) => dispatch(addNewEvent(event)),
    updateEvent_: (event) => dispatch(updateEvent(event))
})

export default connect(null,mapDispatchToProps)(AddEvent);
