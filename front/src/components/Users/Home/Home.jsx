import './Home.css';
import Container from '../Container/Container';
import Hero from '../Hero/Hero';
import Stats from '../Stats/Stats';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faCartArrowDown, faUsers } from '@fortawesome/free-solid-svg-icons'
import { useEffect,useState } from 'react'
import axios from 'axios';

export default function Home(){

    const [companies,setCompanies] = useState(0);
    const [users,setUsers] = useState(0);
    const [orders,setOrders] = useState(0);
    const [items,setItems] = useState(0);

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/companies')
        .then(res => {
            setCompanies(res.data.count)
        })
        axios.get('http://127.0.0.1:8000/api/users/get/1')
        .then(res => {
            setUsers(res.data.count);
        })
        axios.get('http://127.0.0.1:8000/api/orders')
        .then(res => {
            setOrders(res.data.count);
        })
        axios.get('http://127.0.0.1:8000/api/items/get/1')
        .then(res => {
            setItems(res.data.count);
        })
    },[]);

    return(
        <>
        <div className="home"> 
            <Hero></Hero>
            <Stats></Stats>
            <Container></Container>
            <div className='overview section small'>
                <h1 className='title'>Analytics:</h1>
                <div className='cards'>
                    <div className='card'>
                        <FontAwesomeIcon className='card-icon' icon={faBuilding}></FontAwesomeIcon>
                        <div className='card-text'>
                            <h1 className='counter'>{companies}</h1>
                            <span>Total Companies</span>
                        </div>
                    </div>
                    <div className='card'>
                        <FontAwesomeIcon className='card-icon' icon={faUsers}></FontAwesomeIcon>
                        <div className='card-text'>
                            <h1 className='counter'>{users}</h1>
                            <span>Total Users</span>
                        </div>
                    </div>
                    <div className='card'>
                        <FontAwesomeIcon className='card-icon' icon={faCartArrowDown}></FontAwesomeIcon>
                        <div className='card-text'>
                            <h1 className='counter'>{orders}</h1>
                            <span>Total Orders</span>
                        </div>
                    </div>
                    <div className='card'>
                        <FontAwesomeIcon className='card-icon' icon={faCartArrowDown}></FontAwesomeIcon>
                        <div className='card-text'>
                            <h1 className='counter'>{items}</h1>
                            <span>Total Items</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}