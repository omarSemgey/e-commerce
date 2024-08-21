import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Contact.css';
import { faLocationDot, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import {  faEnvelope } from '@fortawesome/free-regular-svg-icons';
export default function Contact(){
    return(
        <>
        <div className="contact section">
            <div className='info'>
                <ul className='cards'>
                    <li className='card'>
                        <FontAwesomeIcon icon={faMobileAlt} className='icon'></FontAwesomeIcon>
                        <div className='text'>
                            <p className='main-text'>Phone</p>
                            <span className='secondary-text'>+963 0934 769 422</span>
                        </div>
                    </li>
                    <li className='card'>
                        <FontAwesomeIcon icon={faEnvelope} className='icon'></FontAwesomeIcon>
                        <div className='text'>
                            <p className='main-text'>Email</p>
                            <span className='secondary-text'>omar.semgey@gmail.com</span>
                        </div>
                    </li>
                    <li className='card'>
                        <FontAwesomeIcon icon={faLocationDot} className='icon'></FontAwesomeIcon>
                        <div className='text'>
                            <p className='main-text'>Address</p>
                            <span className='secondary-text'>10 Suffolk at Soho, London, UK</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div className='contact-us section small'>
                <h1 className='title'>Get in touch</h1>
                <form action="">
                    <div className='form-inputs'>
                        <input type="text" placeholder='Your name' required/>
                        <input type="text" placeholder='Your email' required/>
                        <input type="text" placeholder='Your phone number' required/>
                    </div>
                    <textarea placeholder="Message" rows="4"/>
                    <div className='submit'>
                        <button type='submit'>Send Message</button>
                    </div>
                </form>
            </div>
            </div>
        </>
    )
}