import './Stats.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt, faCommentDots, faCreditCard, faShippingFast, faUndoAlt } from '@fortawesome/free-solid-svg-icons';
export default function Stats(){
    return(
        <>
            <div className='stats section'>
                <ul className='icons'>
                    <li className='stat'>
                        <div className='icon-wrapper shipping'>
                            <FontAwesomeIcon icon={faShippingFast} className='icon'></FontAwesomeIcon>
                        </div>
                        <div className='text'>
                            <h3 className='main-text'>FREE SHIPPING</h3>
                            <span className='secondary-text'>ON ORDER OVER 100%</span>
                        </div>
                    </li>
                    <li className='stat'>
                        <div className='icon-wrapper undo'>
                            <FontAwesomeIcon icon={faUndoAlt} className='icon'></FontAwesomeIcon>
                        </div>
                        <div className='text'>
                            <h3 className='main-text'>Money Back Guarantee</h3>
                            <span className='secondary-text'>Easy 30-day return policy</span>
                        </div>
                    </li>
                    <li className='stat'>
                        <div className='icon-wrapper payment'>
                            <FontAwesomeIcon icon={faCreditCard} className='icon'></FontAwesomeIcon>
                        </div>
                        <div className='text'>
                            <h3 className='main-text'>Secure Payment</h3>
                            <span className='secondary-text'>Visa, Mastercard, Stripe, PayPal</span>
                        </div>
                    </li>
                    <li className='stat'>
                        <div className='icon-wrapper support'>
                            <FontAwesomeIcon icon={faCommentDots} className='icon'></FontAwesomeIcon>
                        </div>
                        <div className='text'>
                            <h3 className='main-text'>Support</h3>
                            <span className='secondary-text'>24/7 Support</span>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}