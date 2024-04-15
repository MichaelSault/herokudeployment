import '../App.css';

//replace with a taller version of the photo from user
import AttireExample from '../assets/Photos/sampleAttire.jpg';

function Attire() {


    return (
        <>

            <div className='attireRow'>
                <div className='attireQuestionsCol'>
                    <div className='attireTitleSubCol'>
                        <h6 className='attireTitle'>Attire</h6>
                        <hr className='hrAttire'/>
                        
                        <div className='attireQuestionsSubCol'>
                            <h2>WHAT DO I WEAR TO THE ANAND KARAJ?</h2>
                            <h3>You will be required to sit on the ground during the ceremony for approximately 1 hour. Comfortable pants, long dresses and modest tops are ideal. Most men wear suits. Your head will also need to be covered in the gurdwara (Sikh temple). Head coverings will be provided for men. Ladies will need to bring a shawl to drape over their heads. You will also be required to remove your shoes at the temple. </h3>
                            <br/>
                            <h2>WHAT DO I WEAR TO THE CIVIL/CEREMONY RECEPTION?</h2>
                            <h3>Formal attire is requested. You can wear Western or South Asian formalwear. Either is appropriate and appreciated, so wear whatever you feel your best in!  </h3>
                            <br/>
                            <h2>WHERE CAN I PURCHASE INDIAN CLOTHING?</h2>
                            <h3>We suggest reaching out to any South Asian friends you can borrow from. There are several boutiques in Brampton and Toronto where you can buy clothes. If you are interested in renting clothing, Meera Meera Rentals is an excellent choice. You can also find indian formalwear on online retailers such as Etsy, Amazon, House of Indya, and The Saree Room. </h3>
                        </div>
                    </div>
                </div>
                <div className='attirePhotoCol'>
                        <img src={AttireExample} className='attireImage' alt="Wedding Photo"/>
                        <h2 className='attireSubText'>Sample Female Anand Karaj Attire</h2>
                </div>
            </div>
        </>
  )
}

export default Attire;