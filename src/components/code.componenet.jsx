import {Button} from "react-bootstrap";
import {useState, useEffect} from 'react';


import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

import '../App.css'
import { CodeOutlined } from "@mui/icons-material";

const Code = ({validate}) => {
    const [Code, setCode] = useState({
        code: ""
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        console.log(value);

        setCode(prev => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const handleSubmit = async(event) => {
        console.log(Code.code)
        if (Code.code == "RossWedding2024") {
            validate();
        } else {
            console.log("Incorrect Code:", Code.code);
        }
    }

    return (
        <>

        <div id='bodyTest' style={{width:"20em", margin:"auto auto", textAlign:"center"}}>
            <h2 className="poiret">Login</h2>
            <FloatingLabel
            controlId="code"
            name="code"
            label="Access Code"
            className="mb-3, poiret"
            >

            <Form.Control type="text" name="code" onChange={handleChange}/>
            {/*Use this line for rsvp using user code*/}
            {/* <Form.Control type="text" name="code" onChange={handleChange}/> */}
            </FloatingLabel>
            <Button variant="outline-dark" style={{width:"100%"}} onClick={handleSubmit}>Continue</Button>
        </div>
        </>
    )
}

export default Code;