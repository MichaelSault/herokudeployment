import '../App.css';

import event1 from '../assets/eventPhotos/event1.png';
import event2 from '../assets/eventPhotos/event2.jpg';
import event3 from '../assets/eventPhotos/event3.jpg';

//replace with a taller version of the photo from user
import SchedulePhoto from '../assets/Photos/SchedulePhoto.png';
import EventCard from './eventCard.component';

function Schedule() {
    return (
        <>
            <div className='scheduleRow'>
                <div className='scheduleTitleCol'>
                    <div className='scheduleTitleSubCol'>
                        <h6>WEDDING WEEK SCHEDULE</h6>
                        <hr></hr>
                        <div id='bodyEventCards'>
                            <div className='eventCardsRow'>
                                <EventCard eventPhoto = {event1} eventName = "Anand Karaj (Sikh Ceremony)" date = "Saturday, August 17, 2024" time = "8:30am" location = "Gurdwara Shaheedgarh Sahib Hamilton" address = "200 Old Guelph Rd, Hamilton, ON L9H 5X6" description = "" active = {false}/>
                                <EventCard eventPhoto = {event2} eventName = "Civil Ceremony" date = "Sunday, August 18, 2024" time = "3:00pm" location = "The Pearle Hotel. The Laurentide Room" address = "Elizabeth St, Burlington, ON L7R 0G3" description = "" active = {false}/>
                                <EventCard eventPhoto = {event3} eventName = "Reception" date = "Sunday, August 18, 2024" time = "3:30pm" location = "The Pearle Hotel. The Edgewater Room" address = "Elizabeth St, Burlington, ON L7R 0G3" description = "" active = {false}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
  )
}

export default Schedule;