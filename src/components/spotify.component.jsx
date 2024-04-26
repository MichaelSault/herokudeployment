import '../App.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';

//react has a built in dotenv, so we do not have to install it manually
const CLIENT_ID = process.env.REACT_APP_SPOTIFY_ID;
const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_SECRET;


function Spotify() {
    const [searchInput, setSearchInput] = useState("");
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        // API Access Token
        var authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
        }
        fetch('https://accounts.spotify.com/api/token', authParameters)
            .then(result => result.json())
            .then(data => setAccessToken(data.access_token));
    }, []);

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
                <Container>
                    <Row className='mx-2 row row-cols-4'>
                        <Card>
                            <Card.Img src="#" />
                            <Card.Body>
                                <Card.Title>Album Name</Card.Title>
                            </Card.Body>
                        </Card>
                    </Row>
                    
                </Container>
            </div>
        </>
  )
}

export default Spotify;