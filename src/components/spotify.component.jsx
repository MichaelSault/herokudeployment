import '../App.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';

//react has a built in dotenv, so we do not have to install it manually
const CLIENT_ID = "79e3f01d09a048a0a6384adb134db9ed";
const CLIENT_SECRET = "5721173d80eb435b839ef571622c2047";
const REDIRECT_URI = "http://rsvp.justinandtanyawedding.com";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";

function Spotify() {
    const [searchInput, setSearchInput] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [userToken, setUserToken] = useState("");
    const [songs, setSongs] = useState([]);

    //expecting http://localhost:5000/#access_token=BQDkVYFtNgdg0NOIFgMMT_PNXg43ZprAAmznLI6PnFpI60ZNTctdMaeecAmz3aZ7xftxzrf9nyYmthTVR8sC1kPSPtDl4KMEDE20KGbRPEx9lLtCJrLhiJ8Df1fPnW1iinRyimKEKP0gFoDy-Gj_W9QlzAR0PvIWK6ltL4m0lfOVFg&token_type=Bearer&expires_in=3600
    const getReturnedParamsFromSpotifyAuth = (hash) => {
        const stringAfterHashtag = hash.substring(1);
        const paramsInUrl = stringAfterHashtag.split("&");

        const paramsSplit = paramsInUrl.reduce((accumulater, currentValue) => {
            console.log(currentValue);
            const [key, value] = currentValue.split("=");
            accumulater[key] = value;
            return accumulater;
        }, {});

        return paramsSplit;
    }

    useEffect(() => {
        if(window.location.hash) {
            const {access_token, expires_in, token_type} = getReturnedParamsFromSpotifyAuth(window.location.hash);
            console.log({access_token});
            setUserToken(access_token);

            localStorage.clear();
            localStorage.setItem("accessToken", access_token);
            localStorage.setItem("tokenType", token_type);
            localStorage.setItem("expiresIn", expires_in);
        }

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
        
            console.log(accessToken);
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

        var songID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput.searchText + '&type=track&limit=8', searchParameters)
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

        console.log(userToken);


        //GET request to get artistID
        var searchParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userToken
            },
            body: {
                'position': 0
            }
        }

        var updatedPlaylist = await fetch('https://api.spotify.com/v1/playlists/4RucsnbAYwsUa7FkmPDJJi/tracks?uris=' + song , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userToken
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.tracks.items);
                setSongs(data.tracks.items);
            });

        
        
    }

    console.log(songs);
    console.log(userToken);
    return (
        <>
            <div className='spotifyRow'>
                <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&show_dialog=true&scope=playlist-modify-public`}>Login to Spotify</a>
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