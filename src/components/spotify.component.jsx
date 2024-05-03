import '../App.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';

//react has a built in dotenv, so we do not have to install it manually
const CLIENT_ID = process.env.REACT_APP_SPOTIFY_ID;
const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_SECRET;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"

function Spotify() {
    const [searchInput, setSearchInput] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [songs, setSongs] = useState([]);

    //expecting http://localhost:5000/#access_token=BQDkVYFtNgdg0NOIFgMMT_PNXg43ZprAAmznLI6PnFpI60ZNTctdMaeecAmz3aZ7xftxzrf9nyYmthTVR8sC1kPSPtDl4KMEDE20KGbRPEx9lLtCJrLhiJ8Df1fPnW1iinRyimKEKP0gFoDy-Gj_W9QlzAR0PvIWK6ltL4m0lfOVFg&token_type=Bearer&expires_in=3600
    const getReturnedParamsFromSpotifyAuth = (hash) => {
        const stringAfterHashtag = hash.substring(1);
        const paramsInUrl = stringAfterHashtag.split("&");

        const paramsSplit = paramsInUrl.reduce((accumulater, currentValue) => {
            const [key, value] = currentValue.split("=");
            accumulater[key] = value;
            return accumulater;
        }, {});

        return paramsSplit;
    }

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

        var songID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput.searchText + '&type=track', searchParameters)
            .then(response => response.json())
            .then(data => {
                console.log(data.tracks.items);
                setSongs(data.tracks.items);
            })

        console.log("Track ID is " + songID);
        //get request with artist ID grab all the albums from that artist
        /* var returnedSongs = await fetch('https://api.spotify.com/v1/tracks/' + songID + '/albums' + '?include_groups=track&market=US&limit=50', searchParameters)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setSongs(data.items);
            }); */
        
    }

    // Spotify Search function
    async function addSong(song) {
        console.log("Adding song: " + song);


        //GET request to get artistID
        var searchParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
            body: {
                'position': 0
            }
        }

        var updatedPlaylist = await fetch('https://api.spotify.com/v1/playlists/4RucsnbAYwsUa7FkmPDJJi/tracks?uris=' + song , searchParameters)
            .then(response => response.json())
            .then(data => {
                console.log(data.tracks.items);
                setSongs(data.tracks.items);
            })

        
        
    }

    console.log(songs);
    return (
        <>
            <div className='spotifyRow'>
                <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&show_dialog=true`}>Login to Spotify</a>
                <Container>
                    <InputGroup className='mb-3' size="lg">
                        <FormControl
                            placeholder='Search For Songs'
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
                        {songs.map((song, i) => {
                            return (
                                <Card>
                                    <a href={song.external_urls.spotify} target="_blank">
                                        <Card.Img src={song.album.images[0].url} />
                                    </a>
                                    <Card.Body>
                                        <Card.Title>{song.name}</Card.Title>
                                    </Card.Body>
                                    <Button onClick={() => addSong(song.uri)}>Add Song</Button>
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