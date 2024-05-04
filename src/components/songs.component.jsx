import '../App.css';

import Spotify from './spotify.component';

//replace with a taller version of the photo from user
import SongPhoto from '../assets/Photos/SongPhoto.png'

function Songs() {


    return (
        <>
            <div className='songRow'>
                <div className='songTitleCol'>
                    <div className='songTitleSubCol'>
                        <h6 className='song'>DJ PLAY THAT SONG</h6>
                        <hr className='hrSongTitle'/>
                        <h2 className='song'>Please select a song or two that will get you on the dance floor!</h2>
                        <hr className='hrSongTitle'/>
                        <Spotify/>
                    </div>
                </div>
                <img src={SongPhoto} className='songImageCol' alt="Wedding Photo"/>
            </div>
        </>
  )
}

export default Songs;