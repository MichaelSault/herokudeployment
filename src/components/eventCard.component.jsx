import { forwardRef } from 'react';
import {useState, useEffect} from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Modal } from "react-bootstrap";

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";


import axios from 'axios';

import '../App.css'
import { Input } from '@mui/material';

// eslint-disable-next-line react/display-name
const EventCard = forwardRef(
    (
        {
            guestEmail,
            rsvpValue,
            eventName,
            date,
            location,
            address,
            time,
            description,
            active,
            eventPhoto
        },
        ref
    ) => {


        //setters for post update modals
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        const [rsvp, setRSVP] = useState(rsvpValue);
        console.log(rsvp);

        const rsvpEvent = async(event) => {
            event.preventDefault();
            console.log("user is rsvping for:", eventName);
            console.log("event currently has value of:", rsvp);

            if (rsvp == 1) {
                setRSVP(2);
                
            } else if (rsvp == 2) {
                setRSVP(1);
            }

            console.log("updating rsvp value to:", rsvp);
        
            axios.put(`http://localhost:5000/rsvpEvent/`, {email: guestEmail, eventName: eventName, rsvpValue: rsvp})
            .then(res => console.log(res))
            .catch((err) => console.log(err));
        
            
        };

        const handleChange = (event) => {
            const {name, value} = event.target;
            console.log(value);
        
            setRSVP(prev => {
                return {
                    ...prev,
                    [name]: value,
                };
            });
        };

        const handleSubmit = async(event) => {

            //will update rsvp and reload page
        
          };
    
    return (
        <>
            <Modal className='center' show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>RSVP for {eventName}</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>

                    <div className='form-floating' style={{marginBottom: '1rem'}}>
                        <select className="form-select" name="civil" defaultValue={1} onChange={handleChange}>
                            <option value={2}>Yes</option>
                            <option value={1}>No</option>
                        </select>
                        <label htmlFor="floatingSelect">RSVP for your party</label>
                    </div>

                    <p>Your party includes:</p>

                    <FloatingLabel
                        controlId="Comment"
                        name="Comment"
                        label="Can anyone in your party not attend?"
                        className="mb-3"
                        >

                        <Form.Control type="text" name="diet" onChange={handleChange}/>

                    </FloatingLabel>

                    <FloatingLabel
                        controlId="Diet"
                        name="Diet"
                        label="Do you have any dietary restrictions?"
                        className="mb-3"
                        >
                            
                        <Form.Control type="text" name="diet" onChange={handleChange}/>

                    </FloatingLabel>

                    <Button variant="outline-dark" style={{width:"100%"}} onClick={handleSubmit}>Update</Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className='eventCardRSVP'>
                <Card className='cardText'>
                    <CardMedia
                        sx={{ minHeight: 75 }}
                        image={eventPhoto}
                        title={eventName}
                    />

                    <div className='cardText'>
                    <CardContent>
                        <Typography fontFamily='Montserrat' gutterBottom variant="h5" component="div">
                            {eventName}
                        </Typography>
                        <Typography fontFamily='Montserrat' fontWeight='bold' gutterBottom variant="caption" component="div">
                            {date} - {time} @{location}
                        </Typography>
                        <Typography fontFamily='Montserrat' variant="body2" color="text.secondary">
                            {description}
                        </Typography>
                        <Typography fontFamily='Montserrat' variant="body2" color="text.secondary">
                            {address}
                        </Typography>
                    </CardContent>

                    {rsvp == 1 ?
                    <CardActions className='cardLinks'>
                        <Button size="small" onClick={handleShow}>RSVP</Button>
                    </CardActions>
                    : rsvp == 2 ?
                    <CardActions className='cardLinks'>
                        <Button size="small" onClick={handleShow}>Can't make it?</Button>
                    </CardActions>
                    : <></>
                    }
                    </div>
                </Card>
            </div>
            
        </>
    )
    }
);

export default EventCard;
