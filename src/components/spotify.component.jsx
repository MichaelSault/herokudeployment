import '../App.css';
import { Container, InputGroup, FormControl, Button, Row, Cards, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';

function Spotify() {
    const [searchInput, setSearchInput] = useState("");

    const handleChange = (event) => {
        const {name, value} = event.target;
        console.log(value);
    
        setSearchInput(prev => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    return (
        <>
            <div className='spotifyRow'>
                <Container>
                    <InputGroup className='mb-3' size="lg">
                        <FormControl
                            placeholder='Search For Artist'
                            type='input'
                            onKeyPress={event => {
                                if (event.key == "Enter") {
                                    console.log("Pressed enter");
                                }
                            }}
                            onChange={(e) => handleChange(e)}
                        />
                        <Button onClick={() => {console.log("button is clicked")}}>
                            Search
                        </Button>
                    </InputGroup>
                </Container>
            </div>
        </>
  )
}

export default Spotify;