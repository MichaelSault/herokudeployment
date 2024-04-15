import '../App.css';

function FAQ() {


    return (
        <>
            <div className='faqRow'>
                
                    <div className='faqTitleSubCol'>
                        <h4>FREQUENTLY</h4>
                        <h4>ASKED</h4>
                        <h4>QUESTIONS</h4>
                    <hr className='hrFaq'/>
                    </div>
                
                <div className='faqQuestionsCol'>
                    <div className='faqQuestionsSubCol' >
                        <h2>WHAT IS THE ANAND KARAJ?</h2>
                        <h3>The Anand Karaj is the Sikh wedding ceremony. The Anand Karaj is comprised of a series of prayers and hymns (lavaans) which symbolizes the bride and grooms vows to one another. </h3>
                        <br/>

                        <h2>CAN I BRING A GUEST?</h2>
                        <h3>If you received a plus one, it will be indicated on your invitation.</h3>
                        <br/>

                        <h2>WILL THERE BE A BAR AT THE RECEPTION?</h2>
                        <h3>Yes! There will be an open bar at the reception which will serve alcoholic and non-alcoholic drinks. </h3>
                        <br/>

                        <h2>WILL THE WEDDING CEREMONIES BE INDOORS?</h2>
                        <h3>Yes, both wedding ceremonies (Anand Karaj and civil ceremony) and the reception will take place indoors. </h3>
                        <br/>

                        <div>
                            <h3 className='faqEmail'>IF YOU HAVE ANY ADDITIONAL QUESTIONS, PLEASE EMAIL US AT SAMRAROSSWEDDING@GMAIL.COM.</h3>
                        </div>
                    
                    </div>
                    
                </div>
            </div>
        </>
  )
}

export default FAQ;