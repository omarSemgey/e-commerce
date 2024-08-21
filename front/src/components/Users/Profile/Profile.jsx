import './Profile.css'
import { useEffect, useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

export default function Profile(){

    const [user,setUser] = useState({});
    const [orders,setOrders] = useState({});

    const navigate = useNavigate();

    const userId = useOutletContext();

    const token = localStorage.getItem('token');

    useEffect(()=>{
        if(token == null) navigate('/sign');
        axios.get(`http://127.0.0.1:8000/api/users/${userId[0]}`)
        .then((response) => {
            setUser(response.data.user);
            setOrders(response.data.user.orders);
        });
    },[]);

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

    return(
        <>
        <div className='profile section small'>
            <div className='page-header'>
            <h1 className='page-title'>My Profile</h1>
            <div className='logout' onClick={handleLogout}>
                <FontAwesomeIcon className='icon' icon={faSignOutAlt}></FontAwesomeIcon>
                Sign out
            </div>
            </div>
            <div className='information'>
                <div className='info-header'>
                <h2 className='title'>User Info:</h2>
                <Link to={`/profile/edit`} > <FontAwesomeIcon icon={faEdit} className='icon edit'></FontAwesomeIcon></Link>
                </div>
                <div className='info'>
                    <span>Name</span>
                    <p> : {user.name}</p>
                </div>
                <div className='info'>
                    <span>Email</span>
                    <p> : {user.email}</p>
                </div>
                <div className='info'>
                    <span>Orders count</span>
                    <p> : {orders.length}</p>
                </div>
            </div>
            <div className='orders'>
            <h2 className='title'>Orders:</h2>
            {
                orders.length !== 0 
                ?
                <table>
                    <thead>
                        <tr>
                            <th className='items'>Items</th>
                            <th className='status'>Status</th>
                            <th className='order-price'>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        Array.from(orders).map((e,index) => {
                            return(
                                <tr key={index}>
                                    <td className='items'><Link to={`/profile/orders/${e.id}`}>{e.items.length}</Link></td>
                                    <td className='status'>{e.status == 0 ? 'ongoing' : 'done'}</td>
                                    <td className='order-price'>${e.price}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                :
                <div className='empty-orders'>
                    <h1>You have no Orders!</h1>
                    <button><Link to={'/shop'}>Go shopping</Link></button>
                </div>
            }
</div>
        </div>
        </>
    )
}