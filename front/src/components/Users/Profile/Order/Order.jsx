import './Order.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Order(){

    const id = window.location.pathname.split('/')[3];

    const [order,setOrder] = useState({});
    const [items,setItems] = useState({});

    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    useEffect(()=>{
        if(token == null) navigate('/sign');
        axios.get(`http://127.0.0.1:8000/api/orders/${id}`)
        .then(res => {
            setOrder(res.data.order);
            setItems(res.data.order.items)
        })
    },[]);

    return(
        <>
        <div className='order section small'>
        <h1 className='page-title'>Order</h1>
            <div className='information'>
                <h2 className='title'>Order Info:</h2>
                <div className='info'>
                    <span>Order state</span>
                    <p> : {order.status == 0 ? 'Ongoing' : 'Done'}</p>
                </div>
                <div className='info'>
                    <span>Orders date</span>
                    <p> : {order.created_at !== undefined && order.created_at.split('T')[0]}</p>
                </div>
            </div>
            <div className='items'>
                <h2 className='title'>Order Items:</h2>
                <div className='items-wrapper'>
                    {
                        Array.from(items).map((e,index) => {
                            return(
                                <div key={index} className='product'>
                                <Link to={`/items/${e.id}`}>
                                    <img src={e.content} alt="" />
                                </Link>
                                <div className='text'>
                                    <Link to={`/items/${e.id}`} className='main-text'>{e.title}</Link>
                                    <span className='sale'>${e.price}</span>
                                </div>
                            </div>
                            )
                        })
                    }
        </div>
            </div>
        </div>
        </>
    )
}