import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import payment from '/public/payment.png'
import { Link } from 'react-router-dom';
export default function Footer({role}){
    return(
        <>
        <div className='footer section'>
            <div className='top-footer'>
                <div className='text'>
                    <h3 className='title'>e-commerce</h3>
                    <p className='secondary-text'>The customer is at the heart of our unique business model, which includes design.</p>
                    <img src={payment} className='payment'></img>
                </div>
                <div className='links-wrapper'>
                    <ul className='links'>
                        <li className='title'>
                            Quick links
                        </li>
                        <li className='link'>
                            <Link to={'/'}>
                                Home
                            </Link>
                        </li>
                        <li className='link'>
                            <Link to={'/Contact'}>
                                Contact
                            </Link>
                        </li>
                        <li className='link'>
                            <Link to={'/shop'}>
                                Shop
                            </Link>
                        </li>
                    </ul>
                    <ul className='links'>
                        <li className='title'>
                            Quick links
                        </li>
                        <li className='link'>
                            <Link to={role == 1 ? '/profile' : '/sign'}>
                                My profile
                            </Link>
                        </li>
                        <li className='link'>
                            <Link to={role == 1 ? '/cart' : '/sign'}>
                                My cart
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className='news'>
                        <h4 className='title'>NewLetter</h4>
                        <p className='secondary-text'>Be the first to know about new arrivals, look books, sales & promos!</p>
                        <div className='email'>
                            <form action="">
                                <input type="email" placeholder='Your email' required/>
                                <button type='submit'>
                                    <FontAwesomeIcon icon={faEnvelope} className='icon'></FontAwesomeIcon>
                                </button>
                            </form>
                        </div>
                </div>
            </div>
            <div className='bottom-footer'>
                <p className='secondary-text'>Copyright © 20242020 All rights reserved | Made by Omar.</p>
            </div>
        </div>
        </>
    )
}