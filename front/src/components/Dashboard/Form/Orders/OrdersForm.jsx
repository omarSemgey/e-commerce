import '../Form.css'
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function OrdersForm(){
    const id = useParams();
    const [data,setData] = useState({});
    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/orders/${id}`)
        .then(res => {
            setData(res.data.order);
        })
    },[]);
    return(
        <>
        <div className='form orders'>
        </div>
        </>
    )
}