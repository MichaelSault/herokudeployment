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
        console.log(searchInput);
    
        setSearchInput(prev => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    // Spotify Search function
    async function search() {
        console.log("Search for " + searchInput.searchText);


        //GET request to get artistID
        var artistParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        }

        var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput.searchText + '&type=artist', artistParameters)
            .then(response => response.json())
            .then(data => console.log(data))
        //display the artists albums

    }

    return (
        <>
            <div className='spotifyRow'>
                <Container>
                    <InputGroup className='mb-3' size="lg">
                        <FormControl
                            placeholder='Search For Artist'
                            type='input'
                            name='searchText'
                            onKeyPress={event => {
                                if (event.key == "Enter") {
                                    console.log("Pressed enter");
                                    search();
                                }
                            }}
                            onChange={(e) => handleChange(e)}
                        />
                        <Button onClick={() => {search()}}>
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