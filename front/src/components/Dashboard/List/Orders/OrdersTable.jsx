import '../Table.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function OrdersTable(){

    const [render,setRender] = useState({});
    const [data,setData] = useState({});
    const [count,setCount] = useState(0);

    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/orders`)
        .then(res => {
            setData(res.data.orders);
            setCount(res.data.count);
        })
    },[render])

    async function handleStatusUpdate(id,status){
        const token=localStorage.getItem('token');
        await axios.put(`http://127.0.0.1:8000/api/orders/${id}`,
        {
            status: status == 1 ? 0 : 1,
        },
        { headers: 
            { 
                'Authorization': `Bearer ${token}`
            } 
        });
        setRender(render + 1)
    }

    return(
        <>
        <div className='table orders'>
            <h3 className='info'>Showing {data.length} orders from {count}</h3>
            <table>
                <thead>
                    <tr>
                        <th className='title'>User</th>
                        <th className='quantity'>Items</th>
                        <th className='count'>Status</th>
                        <th className='price'>Price</th>
                        <th className='price'>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {
                Array.from(data).map((e,index) => {
                    return(
                        <tr key={index}>
                            <td className='title'>{e.user.name}</td>
                            <td className='price order-link'><Link to={`/dashboard/orders/show/${e.id}`}>{e.items.length}</Link></td>
                            <td className='quantity'>{e.status == 0 ? 'ongoing' : 'done'}</td>
                            <td className='price'>${e.price}</td>
                            <td onClick={() => handleStatusUpdate(e.id,e.status)} className={`update-status ${e.status == 0 ? 'ongoing' : 'done'}`}>{e.status == 0 ? 'set done' : 'set ongoing'}</td>
                        </tr>
                    )
                })
            }
                </tbody>
            </table>
        </div>
        </>
    )
}