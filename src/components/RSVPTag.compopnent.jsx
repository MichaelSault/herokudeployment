import { Button } from '@mui/material';
import {useState, useEffect} from 'react';
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import axios from 'axios';
import '../App.css';

function RSVPTag() {

    //setters for post update modals
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [returnedData, setReturnedData] = useState({
        family: "", 
        firstName: "", 
        lastName: "",
        sangeet: "",
        maiyan: "",
        mendhi: "",
        choora: "",
        sikh: "",
        civil: "",
        diet: "",
        comment: ""
    });
    
    const [rsvpData, setRsvpData] = useState({
        family: String, 
        firstName: String, 
        lastName: String,
        sangeet: Number,
        maiyan: Number,
        mendhi: Number,
        choora: Number,
        sikh: Number,
        civil: Number,
        diet: String,
        comment: String
    });

    const [returnedFamilyData, setReturnedFamilyData] = useState([]);


    const handleChange = (event) => {
        const {name, value} = event.target;
        console.log(value);
    
        setRsvpData(prev => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const handleFamilyChange = (famIndex, event) => {
        console.log(famIndex);
        console.log(event.target.name);
        const {name, value} = event.target.name;
        console.log(value);
    
        let newArr = [...returnedFamilyData];

        console.log([event.target.name][0]);

        if (([event.target.name] == ("diet"))||([event.target.name] == ("comment"))){
            newArr[famIndex][event.target.name] = (event.target.value);
            console.log(event.target.value);
        } else {
            newArr[famIndex][event.target.name] = parseInt(event.target.value);
        }
        

        console.log(newArr);
        setReturnedFamilyData(newArr);
        console.log(returnedFamilyData);
    };
    
    const handleSubmit = async(event) => {
        event.preventDefault();
        console.log(rsvpData.email);

        //use this function if RSVP-ing with full name
        const familyData = await axios.get("http://localhost:3001/getFamily", {params: {firstName: rsvpData.firstName, lastName: rsvpData.lastName}})
        .then(res => res.data)
        .catch(err => console.log(err));

        console.log(familyData);
        setReturnedFamilyData(familyData);
        console.log(returnedFamilyData);
        handleShow(); 
    };

    const submitRSVP = async(event) => {
        event.preventDefault();
        console.log(returnedFamilyData);

        {returnedFamilyData.map((family) => {
            console.log(family);
            //use this function if RSVP-ing with full name
            const familyData = axios.post("http://localhost:3001/submitRSVP", family)
            .then(res => res.data)
            .catch(err => console.log(err));

            console.log(familyData);
        })}
    };


    return (
        <>
            <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>RSVP</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {returnedFamilyData.map((guest, index) => {
                    return(
                        <Form>
                            <Form.Group>
                                <Modal.Title>{returnedFamilyData[index].firstName} {returnedFamilyData[index].lastName}</Modal.Title>

                                {returnedFamilyData[index].sangeet > 0 && (
                                    <div className='form-floating' style={{marginBottom: '1rem'}}>
                                        <select className="form-select" name="sangeet" value={returnedFamilyData[index].sangeet} defaultValue={returnedFamilyData[index].sangeet} onChange={(e) => handleFamilyChange(index, e)}>
                                            <option value={1}>Not Attending</option>
                                            <option value={2}>Attending</option>
                                        </select>
                                        <label htmlFor="floatingSelect">Sangeet</label>
                                    </div>
                                )}

                                {returnedFamilyData[index].maiyan > 0 && (
                                    <div className='form-floating' style={{marginBottom: '1rem'}}>
                                        <select className="form-select" name="maiyan" value={returnedFamilyData[index].maiyan} defaultValue={returnedFamilyData[index].maiyan} onChange={(e) => handleFamilyChange(index, e)}>
                                            <option value={1}>Not Attending</option>
                                            <option value={2}>Attending</option>
                                        </select>
                                        <label htmlFor="floatingSelect">Maiyan</label>
                                    </div>
                                )}

                                {returnedFamilyData[index].mendhi > 0 && (
                                    <div className='form-floating' style={{marginBottom: '1rem'}}>
                                        <select className="form-select" name="mendhi" value={returnedFamilyData[index].mendhi} defaultValue={returnedFamilyData[index].mendhi} onChange={(e) => handleFamilyChange(index, e)}>
                                            <option value={1}>Not Attending</option>
                                            <option value={2}>Attending</option>
                                        </select>
                                        <label htmlFor="floatingSelect">Mendhi</label>
                                    </div>
                                )}

                                {returnedFamilyData[index].choora > 0 && (
                                    <div className='form-floating' style={{marginBottom: '1rem'}}>
                                        <select className="form-select" name="choora" value={returnedFamilyData[index].choora} defaultValue={returnedFamilyData[index].choora} onChange={(e) => handleFamilyChange(index, e)}>
                                            <option value={1}>Not Attending</option>
                                            <option value={2}>Attending</option>
                                        </select>
                                        <label htmlFor="floatingSelect">Choora</label>
                                    </div>
                                )}

                                {returnedFamilyData[index].sikh > 0 && (
                                    <div className='form-floating' style={{marginBottom: '1rem'}}>
                                        <select className="form-select" name="sikh" value={returnedFamilyData[index].sikh} defaultValue={returnedFamilyData[index].sikh} onChange={(e) => handleFamilyChange(index, e)}>
                                            <option value={1}>Not Attending</option>
                                            <option value={2}>Attending</option>
                                        </select>
                                        <label htmlFor="floatingSelect">Sikh Ceremony</label>
                                    </div>
                                )}

                                {returnedFamilyData[index].civil > 0 && (
                                    <div className='form-floating' style={{marginBottom: '1rem'}}>
                                        <select className="form-select" name="civil" value={returnedFamilyData[index].civil} defaultValue={returnedFamilyData[index].civil} onChange={(e) => handleFamilyChange(index, e)}>
                                            <option value={1}>Not Attending</option>
                                            <option value={2}>Attending</option>
                                        </select>
                                        <label htmlFor="floatingSelect">Civil Ceremony</label>
                                    </div>
                                )}
                                <FloatingLabel
                                    controlId="diet"
                                    name="diet"
                                    label="Dietary Restrictions"
                                    className="mb-3"
                                >
                                <Form.Control 
                                    type="text" 
                                    name="diet" 
                                    onChange={(e) => handleFamilyChange(index, e)}
                                />
                                </FloatingLabel>

                                <FloatingLabel
                                    controlId="comment"
                                    name="comment"
                                    label="Other Comments"
                                    className="mb-3"
                                >
                                <Form.Control 
                                    type="text" 
                                    name="comment" 
                                    onChange={(e) => handleFamilyChange(index, e)}
                                />
                                </FloatingLabel>

                            </Form.Group>
                        </Form>
            
                    )
                })}

            </Modal.Body>
            
            <Modal.Footer>
                <Button onClick={handleClose}>
                    Close
                </Button>
                <Button onClick={submitRSVP}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>

            <div className='rsvpRow'>
            <div className='rsvpTitle'>
                    <h6><i>We hope to see you from the altar!</i></h6>
                    <hr className='hrRSVP'/>
            </div>
            <div className='rsvpDeadline'>
                <p className='elsie rsvpText'>We kindly request your response by May 6, 2024.  Cheers!</p>
            
            <FloatingLabel
                controlId="firstName"
                name="firstName"
                label="First Name"
                className="mb-3"
            >
            <Form.Control 
                type="text" 
                name="firstName" 
                onChange={handleChange}
            />
            </FloatingLabel>

            <FloatingLabel
                controlId="lastName"
                name="lastName"
                label="Last Name"
                className="mb-3"
            >
            <Form.Control 
                type="text" 
                name="lastName" 
                onChange={handleChange}
            />
            </FloatingLabel>

            <button disabled={false} className='rsvpTagButton elsie' onClick={handleSubmit}>Continue</button>
            </div>

            </div>
        </>
  )
}

export default RSVPTag;