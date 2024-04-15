import '../App.css';

import EngagementCarousel from './engagementCarousel.component';

function EngagementShoot() {


    return (
        <>
            <div className='engagementShootRow' >
                    
                <div className='engagementShootCol'>
                    <div className='engagementShootSubColMobile'>
                        <h6 className='engagementTitle'>ENGAGEMENT </h6>
                        <h6 className='engagementTitle'>SHOOT</h6>
                        <hr />
                        
                    </div>
                    <div className='engagementShootPhotoCol'>
                        <EngagementCarousel />
                    </div>
                </div>
                
                <div className='engagementShootCol mobile-hidden'>
                    <div className='engagementShootSubColDesktop' >
                        <h6>ENGAGEMENT SHOOT</h6>
                        <hr/>                        
                    </div>
                </div>

            </div>
        </>
  )
}

export default EngagementShoot;