import {Button, Form} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import axios from 'axios';

import FloatingLabel from "react-bootstrap/FloatingLabel";

import TitleHeader from './titleBanner.component';
import '../App.css';

function AddGuest() {
    const [guest, setGuest] = useState({
        familyID: "",
        firstName: "",
        lastName: "",
        email: "",
        sangeet: 0,
        maiyan: 0,
        mendhi: 0,
        choora: 0,
        sikh: 0,
        civil: 0
    });

    const handleChange = (event) => {
        const {name, value} = event.target;

        setGuest(prev => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const handleChangeInvited = (event) => {
        let {name, value} = event.target;
        
        console.log(guest[name]);

        if(guest[name] != 1){
            value = 1;
        } else {
            value = 0;
        }

        console.log(name, ":", value);

        setGuest(prev => {
            return {
                ...prev,
                [name]: value,
            }
        });
    }

    useEffect(() => {
        console.log(guest);
    }, [guest]);

    const handleClick = (event) => {
        event.preventDefault();
        console.log(guest);

        axios.post("https://tanya-wedding-website-94146677832a.herokuapp.com/InviteGuest", guest)
        .then(res => console.log(res))
        .catch(err => console.log(err));

    };

    return(
        <>
            <TitleHeader Title={'Invite a Guest'}/>
            <div id='inviteBody' style={{width:"100%", margin:"auto auto", textAlign:"center"}}>
            <h6>Invite a Guest</h6>
            <Form>
                <Form.Group>
                    <FloatingLabel
                        controlId="familyID"
                        name="familyID"
                        label="FamilyID"
                        className="mb-3"
                    >
                    <Form.Control
                        name='familyID'
                        value={guest.familyID} 
                        placeholder='FamilyID' 
                        style={{marginBottom: '1rem'}} 
                        onChange={handleChange}
                    />
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="firstName"
                        name="firstName"
                        label="First Name"
                        className="mb-3"
                    >
                    <Form.Control
                        name='firstName'
                        value={guest.firstName} 
                        placeholder='First Name' 
                        style={{marginBottom: '1rem'}} 
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
                        name="lastName"
                        value={guest.lastName} 
                        placeholder='Last Name' 
                        style={{marginBottom: '1rem'}} 
                        onChange={handleChange}
                    />
                    </FloatingLabel>
                    
                    <FloatingLabel
                        controlId="email"
                        name="email"
                        label="Email"
                        className="mb-3"
                    >
                    <Form.Control
                        name="email"
                        value={guest.email} 
                        placeholder='Email' 
                        onChange={handleChange}
                        className="mb-3"
                    />
                    </FloatingLabel>
                    <h6>Events</h6>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox" style={{width:"100%", margin:"auto auto", textAlign:"left"}}>
                        <Form.Check inline type="checkbox" label="Sangeet & Jaggo" name="sangeet" onChange={handleChangeInvited}/>
                        <Form.Check inline type="checkbox" label="Maiyan" name="maiyan" onChange={handleChangeInvited}/>
                        <Form.Check inline type="checkbox" label="Mendhi" name="mendhi" onChange={handleChangeInvited}/>
                        <Form.Check inline type="checkbox" label="Choora" name="choora" onChange={handleChangeInvited}/>
                        <Form.Check inline type="checkbox" label="Anand Karaj (Sikh Ceremony)" name="sikh" onChange={handleChangeInvited}/>
                        <Form.Check inline type="checkbox" label="Civil Ceremony & Reception" name="civil" onChange={handleChangeInvited}/>
                    </Form.Group>
                </Form.Group>
                <Button variant="outline-dark" style={{width:"100%", marginBottom:'1rem'}} onClick={handleClick}>Invite Guest</Button>
            </Form>
            </div>
        </>
    );
}

export default AddGuest;