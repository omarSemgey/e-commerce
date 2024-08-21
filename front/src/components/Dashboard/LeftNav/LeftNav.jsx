import './LeftNav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faCartArrowDown, faFileAlt, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import axios from 'axios';

export default function LeftNav({role}) {
    //###hooks###
    const navigate= useNavigate();
    //###refs###
    //sidebar lists refs
    // const branches = useRef();
    const users = useRef();
    const admins = useRef();
    const sellers = useRef();
    const categories = useRef();
    const companies = useRef();
    const orders = useRef();
    const items = useRef();
    function handleLinks(e){
        const condition = document.querySelector('.sidebar-item.active') == e.current;
        if(document.querySelector('.sidebar-item.active')) document.querySelector('.sidebar-item.active').classList.remove('active');
        if(!condition) e.current.classList.add('active');
    }

    function handleLogout(){
        const token=localStorage.getItem('token');
        axios.post(`http://127.0.0.1:8000/api/auth/logout`,
        [],
        { 
            headers: {
                    'Authorization': `Bearer ${token}` 
                }
        })
        .then((response) => {
            localStorage.removeItem('token')
            localStorage.removeItem('role')
            navigate('/sign')
        });
    }

    function handleList(e){
        if(!e.target.classList.contains('list-active')){
            if(document.querySelector('.sidebar-list-item.active')) document.querySelector('.sidebar-list-item.active').classList.remove('active');
            e.target.classList.add('active')
        }
    }
    return(
        <>
        <div className='left-nav'>
        <div className='nav-container'>
            <h6>Main</h6>
            <ul>
                {/* {
                    role == 3 &&
                    <li ref={branches} className='sidebar-item'>
                        <span className='sidebar-link sidebar-main-link' onClick={()=>{handleLinks(branches)}}>
                        <FontAwesomeIcon icon={faBuilding} className='sidebar-icon'></FontAwesomeIcon> 
                        <span className='link-title'>Branches</span>
                        <FontAwesomeIcon icon={faAngleLeft} className='sidebar-arrow'></FontAwesomeIcon> 
                        </span>
                        <ul className='nav-list '>
                            <li onClick={(e)=>{handleList(e)}}>
                                <Link to={`/dashboard/branches`}  href="#" className='sidebar-link sidebar-list-item' >
                                    Branches list
                                </Link>
                            </li>
                            <li onClick={(e)=>{handleList(e)}}>
                                <Link to={`/dashboard/branches/create`}  href="#" className='sidebar-link sidebar-list-item' >
                                    Create Branch
                                </Link>
                            </li>
                        </ul>
                    </li>
                } */}
                {
                    role == 3 &&
                    <li ref={users} className='sidebar-item'>
                        <span className='sidebar-link sidebar-main-link' onClick={()=>{handleLinks(users)}}>
                        <FontAwesomeIcon icon={faUser} className='sidebar-icon'></FontAwesomeIcon> 
                        <span className='link-title'>Users</span>
                        <FontAwesomeIcon icon={faAngleLeft} className='sidebar-arrow'></FontAwesomeIcon> 
                        </span>
                        <ul className='nav-list'>
                            <li onClick={(e)=>{handleList(e)}}>
                                <Link to={`/dashboard/users`}  href="#" className='sidebar-link sidebar-list-item' >
                                    Users list
                                </Link>
                            </li>
                            <li onClick={(e)=>{handleList(e)}}>
                                <Link to={`/dashboard/users/create`} href="#" className='sidebar-link sidebar-list-item' >
                                    Create User
                                </Link>
                            </li>
                        </ul>
                    </li>
                }
                {
                    role == 3 &&
                    <li ref={admins} className='sidebar-item'>
                        <span className='sidebar-link sidebar-main-link' onClick={()=>{handleLinks(admins)}}>
                        <FontAwesomeIcon icon={faUser} className='sidebar-icon'></FontAwesomeIcon> 
                        <span className='link-title'>Admins</span>
                        <FontAwesomeIcon icon={faAngleLeft} className='sidebar-arrow'></FontAwesomeIcon> 
                        </span>
                        <ul className='nav-list '>
                            <li onClick={(e)=>{handleList(e)}}>
                                <Link to={`/dashboard/admins`} href="#" className='sidebar-link sidebar-list-item' >
                                    Admins list
                                </Link>
                            </li>
                            <li onClick={(e)=>{handleList(e)}}>
                                <Link to={`/dashboard/admins/create`} href="#" className='sidebar-link sidebar-list-item' >
                                    Create Admin
                                </Link>
                            </li>
                        </ul>
                    </li>
                }
                {
                    role == 3 &&
                    <li ref={sellers} className='sidebar-item'>
                        <span className='sidebar-link sidebar-main-link' onClick={()=>{handleLinks(sellers)}}>
                        <FontAwesomeIcon icon={faUser} className='sidebar-icon'></FontAwesomeIcon> 
                        <span className='link-title'>Sellers</span>
                        <FontAwesomeIcon icon={faAngleLeft} className='sidebar-arrow'></FontAwesomeIcon> 
                        </span>
                        <ul className='nav-list '>
                            <li onClick={(e)=>{handleList(e)}}>
                                <Link to={`/dashboard/sellers`} href="#" className='sidebar-link sidebar-list-item' >
                                    Sellers list
                                </Link>
                            </li>
                            <li onClick={(e)=>{handleList(e)}}>
                                <Link to={`/dashboard/sellers/create`} href="#" className='sidebar-link sidebar-list-item' >
                                    Create Sellers
                                </Link>
                            </li>
                        </ul>
                    </li>
                }
                {
                    role == 3 &&
                    <li ref={categories} className='sidebar-item'>
                            <span className='sidebar-link sidebar-main-link' onClick={()=>{handleLinks(categories)}}>
                            <FontAwesomeIcon icon={faUser} className='sidebar-icon'></FontAwesomeIcon> 
                            <span className='link-title'>Categories</span>
                            <FontAwesomeIcon icon={faAngleLeft} className='sidebar-arrow'></FontAwesomeIcon> 
                            </span>
                            <ul className='nav-list'>
                                <li onClick={(e)=>{handleList(e)}}>
                                    <Link to={`/dashboard/categories`} href="#" className='sidebar-link sidebar-list-item' >
                                        Categories list
                                    </Link>
                                </li>
                                <li onClick={(e)=>{handleList(e)}}>
                                    <Link to={`/dashboard/categories/create`} href="#" className='sidebar-link sidebar-list-item' >
                                        Create Category
                                    </Link>
                                </li>
                            </ul>
                    </li>
                }
                <li ref={companies} className='sidebar-item'>
                    <span className='sidebar-link sidebar-main-link' onClick={()=>{handleLinks(companies)}}>
                    <FontAwesomeIcon icon={faFileAlt} className='sidebar-icon'></FontAwesomeIcon> 
                    <span className='link-title'>Companies</span>
                    <FontAwesomeIcon icon={faAngleLeft} className='sidebar-arrow'></FontAwesomeIcon> 
                    </span>
                    <ul className='nav-list'>
                        <li onClick={(e)=>{handleList(e)}}>
                            <Link to={`/dashboard/companies`} href="#" className='sidebar-link sidebar-list-item' >
                                Companies list
                            </Link>
                        </li>
                        <li onClick={(e)=>{handleList(e)}}>
                            <Link to={`/dashboard/companies/create`} href="#" className='sidebar-link sidebar-list-item' >
                                Create Company
                            </Link>
                        </li>
                    </ul>
                </li>
                {
                    role == 3 &&
                    <li ref={orders} className='sidebar-item'>    
                        <span className='sidebar-link sidebar-main-link' onClick={()=>{handleLinks(orders)}}>
                        <FontAwesomeIcon icon={faCartArrowDown} className='sidebar-icon'></FontAwesomeIcon> 
                        <span className='link-title'>Orders</span>
                        <FontAwesomeIcon icon={faAngleLeft} className='sidebar-arrow'></FontAwesomeIcon> 
                        </span>
                        <ul className='nav-list'>
                            <li onClick={(e)=>{handleList(e)}}>
                                <Link to={`/dashboard/orders`} href="#" className='sidebar-link sidebar-list-item' >
                                    Orders list
                                </Link>
                            </li>
                            {/* <li onClick={(e)=>{handleList(e)}}>
                                <Link to={`/dashboard/orders/create`} href="#" className='sidebar-link sidebar-list-item' >
                                    Create Orders
                                </Link>
                            </li> */}
                        </ul>
                    </li>
                }
                <li ref={items} className='sidebar-item'>    
                    <span className='sidebar-link sidebar-main-link' onClick={()=>{handleLinks(items)}}>
                    <FontAwesomeIcon icon={faCartArrowDown} className='sidebar-icon'></FontAwesomeIcon> 
                    <span className='link-title'>Items</span>
                    <FontAwesomeIcon icon={faAngleLeft} className='sidebar-arrow'></FontAwesomeIcon> 
                    </span>
                    <ul className='nav-list'>
                        <li onClick={(e)=>{handleList(e)}}>
                            <Link to={`/dashboard/items`} href="#" className='sidebar-link sidebar-list-item' >
                                Items list
                            </Link>
                        </li>
                        <li onClick={(e)=>{handleList(e)}}>
                            <Link to={`/dashboard/items/create`} href="#" className='sidebar-link sidebar-list-item' >
                                Create Item
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className='sidebar-item log-out'>
                    <span className='sidebar-link sidebar-main-link' onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} className='sidebar-icon'></FontAwesomeIcon> 
                    <span className='link-title'>logout</span>
                    </span>
                </li>
            </ul>
        </div>
        </div>
        </>
    )
}