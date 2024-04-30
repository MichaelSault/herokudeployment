import '../App.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';

//react has a built in dotenv, so we do not have to install it manually
const CLIENT_ID = process.env.REACT_APP_SPOTIFY_ID;
const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_SECRET;


function Spotify() {
    const [searchInput, setSearchInput] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [albums, setAlbums] = useState([]);

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
        var searchParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        }

        var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput.searchText + '&type=artist', searchParameters)
            .then(response => response.json())
            .then(data => {return data.artists.items[0].id})

        console.log("Artist ID is " + artistID);
        //get request with artist ID grab all the albums from that artist
        var returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=US&limit=50', searchParameters)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setAlbums(data.items);
            });
        //display the artists albums
        
    }
    console.log(albums);
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
                        {albums.map((album, i) => {
                            return (
                                <Card>
                                    <a href={album.external_urls.spotify} target="_blank">
                                        <Card.Img src={album.images[0].url} />
                                    </a>
                                    <Card.Body>
                                        <Card.Title>{album.name}</Card.Title>
                                    </Card.Body>
                                </Card>
                            )
                        })}
                        
                    </Row>
                    
                </Container>
            </div>
        </>
  )
}

export default Spotify;