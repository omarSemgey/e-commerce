import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping, faSearch, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useRef } from 'react';

export default function Header({role}){

    const header = useRef(null);
    const menu = useRef();
    const search = useRef();

    const navigate = useNavigate();

    function handleMenu(){
        header.current.classList.toggle('active');
        menu.current.classList.toggle('checked');
    }

    function handleSearch(e){
        e.preventDefault();
        if(search.current.value !== '') navigate(`/search/${search.current.value}`)
    }

    function handleTheme(){
        const theme = localStorage.getItem('theme');
        if(theme == null || theme == 'light') localStorage.setItem('theme', 'dark');  document.querySelector('body').classList.add('dark');
        if(theme == 'dark') localStorage.setItem('theme','light');
        if(theme == 'light') document.querySelector('body').classList.remove('dark');
        if(theme == 'dark') document.querySelector('body').classList.add('dark');
    }

    return(
        <>
        <div ref={header} className='header'>
            <div className='logo'>
                <h2>e-commerce</h2>
            </div>
            <ul className='links'>
            <li className='link'>
                <Link to={'/'}>
                    HOME
                </Link>
            </li>
            <li className='link'>
                <Link to={'/contact'}>
                    CONTACT
                </Link>
            </li>
            <li className='link'>
                <Link to={'/shop'}>
                    SHOP
                </Link>
            </li>
            <li className='link search'>
                <form action="" onSubmit={(e)=>handleSearch(e)}>
                    <input ref={search} type="text" placeholder='search product...'/>
                    <FontAwesomeIcon icon={faSearch} className='icon'></FontAwesomeIcon>
                </form>
            </li>
            <li className='link theme' onClick={handleTheme}>
                    <FontAwesomeIcon className='icon moon' icon={faMoon}></FontAwesomeIcon>
                    <FontAwesomeIcon className='icon sun' icon={faSun}></FontAwesomeIcon>
            </li>
            <li className='link icon'>
                <Link to={role == 1 ? '/cart' : '/sign'}>
                    <FontAwesomeIcon icon={faBasketShopping}></FontAwesomeIcon>
                </Link>
            </li>
            <li className='link icon'>
                <Link to={role == 1 ? '/profile' : '/sign'}>
                    <FontAwesomeIcon icon={faUserAlt}></FontAwesomeIcon>
                </Link>
            </li>
            </ul>
            <div className="drop-down" onClick={handleMenu}>
                <span ref={menu} className="menu"></span>
            </div>
        </div>
        </>
    )
    }