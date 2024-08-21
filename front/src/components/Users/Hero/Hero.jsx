import './Hero.css'
import { Link } from "react-router-dom";
import  logo  from "/public/hero-brand-logo.png";
export default function Hero(){
    return(
        <>
        <div className='hero'>
            <div className='text-wrapper'>
            <div className='text'>
                <img className='logo' src={logo} alt="" />
                <h2 className='main-text'>The best electronics for you home</h2>
                <p className='secondary-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem eius sacs</p>
                <Link to={'/shop'} className='link' >Shop now</Link>
            </div>
            </div>
        </div>
        </>
    );
}