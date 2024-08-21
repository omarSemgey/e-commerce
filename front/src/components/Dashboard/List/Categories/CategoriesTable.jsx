import '../Table.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function CategoriesTable(){

    const page = window.location.pathname.split('/')[2];

    const [render,setRender] = useState({});
    const [data,setData] = useState({});
    const [count,setCount] = useState(0);

    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/${page}`)
        .then(res => {
            setCount(res.data.count)
            setData(res.data[page]);
        })
    },[render])
        async function handleDelete(id){
        const token=localStorage.getItem('token');
        await axios.delete(`http://127.0.0.1:8000/api/${page}/${id}`,
        { headers: 
            { 
                'Authorization': `Bearer ${token}`
            } 
        });
        setRender(render + 1)
    }
    return(
        <>
        <div className='table '>
            <h3 className='info'>Showing {data.length} {page} from {count}</h3>
            <table>
                <thead>
                    <tr>
                        <th className='title'>{page == 'categories' ? 'Category' : (page == 'companies' ? 'Company' : 'Branch')}</th>
                        <th className='price'>Description</th>
                        <th className='quantity'>{page !== 'branches' ?  'Items' : 'Orders'}</th>
                        <th className='actions'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                Array.from(data).map((e,index) => {
                    return(
                        <tr key={index}>
                        <td className='title'>{e.title}</td>
                        <td className='price'>{e.description}</td>
                        <td className='quantity'>{page !== 'branches' ?  e.items.length : e.orders.length}</td>
                        <td className='actions'>
                            <div className='icons-wrapper'>
                                <Link to={`/dashboard/${page}/edit/${e.id}`} > <FontAwesomeIcon icon={faEdit} className='icon edit'></FontAwesomeIcon> </Link>
                                {page !== 'branches' && e.items.length < 1 && <Link onClick={()=>handleDelete(e.id)}> <FontAwesomeIcon icon={faTrashAlt} className='icon delete'></FontAwesomeIcon> </Link>}
                                {page == 'branches' && e.orders.length < 1 && <Link onClick={()=>handleDelete(e.id)}> <FontAwesomeIcon icon={faTrashAlt} className='icon delete'></FontAwesomeIcon> </Link>}
                            </div>
                        </td>
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