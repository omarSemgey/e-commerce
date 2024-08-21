import '../Table.css'
import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import { faArrowLeftLong, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';

export default function UsersTable({render}){

    const user = window.location.pathname.split('/')[2];

    const [update,setUpdate] = useState(0);
    const [data,setData] = useState({});
    const [count,setCount] = useState(0);

    const navigate = useNavigate();

    const page = useParams();

    const page1 = useRef();
    const page2 = useRef();
    const page3 = useRef();
    const backArrow = useRef();
    const forwardArrow = useRef();

    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/users/get/${page.page == undefined ? 1 : page.page}`)
        .then(res => {
            if(user == 'users') setData(Array.from(res.data.users).filter(user => user.role == 1));
            if(user == 'admins') setData(Array.from(res.data.users).filter(user => user.role == 3));
            if(user == 'sellers') setData(Array.from(res.data.users).filter(user => user.role == 2));

            setCount(res.data.count);

            if(res.data.users.length == 0) navigate(`/dashboard/${user}`);

            if(res.data.count > 20){
                    const active = document.querySelector('.dashboard .list .table.users-table .page-numbers .numbers .number.active')
                    if(active !== null) active.classList.remove('active');
                    if(page.page == 1 || page.page == undefined) page1.current.classList.add('active');
                    if(page.page == 2) page2.current.classList.add('active');
                    if(page.page == 3) page3.current.classList.add('active');
            }
        })
    },[render, update]);

    async function handleDelete(id){
        const token=localStorage.getItem('token');
        await axios.delete(`http://127.0.0.1:8000/api/users/${id}`,
        { headers: 
            { 
                'Authorization': `Bearer ${token}`
            } 
        });
        setUpdate(update + 1)
    }


    function handlePageChange(arrow){
        if(arrow == 'forward'){
            if(!(parseInt(parseInt(page.page) + 1) * 10 >= count)) navigate(`/dashboard/${user}/${page.page == undefined ? 2 : parseInt(page.page) + 1}`);
        }else{
            if(page.page !== 1 || page.page !== undefined) navigate(`/dashboard/${user}/${page.page - 1}`);
        }
    }


    return(
        <>
        <div className='table users-table'>
            <h3 className='info'>showing {data.length} {user} from {count}</h3>
            <table>
                <thead>
                    <tr>
                        <th className='title'>{user}</th>
                        <th className='price'>Email</th>
                        {user == 'users' && <th className='quantity'>Orders</th>}
                        <th className='actions'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    Array.from(data).map((e,index) => {
                        return(
                            <tr key={index}>
                            <td className='title'>{e.name}</td>
                            <td className='price'>{e.email}</td>
                            {user == 'users' && <td className='quantity'>{e.orders.length}</td>}
                            <td className='actions'>
                                <div className='icons-wrapper'>
                                    <Link to={`/dashboard/${user}/edit/${e.id}`} > <FontAwesomeIcon icon={faEdit} className='icon edit'></FontAwesomeIcon> </Link>
                                    <Link onClick={()=>handleDelete(e.id)}> <FontAwesomeIcon icon={faTrashAlt} className='icon delete'></FontAwesomeIcon> </Link>
                                </div>
                            </td>
                        </tr>
                        )
                    })
                    }
                </tbody>
            </table>
            {
                count > 20 &&
                <div className='page-numbers'>
                    <ul className='numbers'>
                        {
                            page.page > 1 && 
                            <li onClick={() => handlePageChange('back')} ref={backArrow} className='arrow'>
                                <Link to={''}><FontAwesomeIcon icon={faArrowLeftLong}></FontAwesomeIcon></Link>
                            </li>
                        }
                        <li ref={page1} className='number active'>
                            <Link to={`/dashboard/${user}`}>1</Link>
                        </li>
                        <li ref={page2} className='number'>
                            <Link to={`/dashboard/${user}/2`}>2</Link>
                        </li>
                        {
                            count >= 30 &&
                            <li ref={page3} className='number'>
                                <Link to={`/dashboard/${user}/3`}>3</Link>
                            </li>
                        }
                        {
                            !(parseInt(parseInt(page.page) + 1) * 10 >= count) &&
                            <li onClick={() => handlePageChange('forward')} ref={forwardArrow} className='arrow'>
                                <Link to={''}><FontAwesomeIcon icon={faArrowRightLong}></FontAwesomeIcon></Link>
                            </li>
                        }
                    </ul>
                </div>
            }
        </div>
        </>
    )
}