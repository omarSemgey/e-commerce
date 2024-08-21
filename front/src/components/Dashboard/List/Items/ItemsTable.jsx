import '../Table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { faArrowRightLong, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

export default function ItemsTable({render}){

    const [data,setData] = useState({});    
    const [count,setCount] = useState(0);
    const [update,setUpdate] = useState(0);

    const navigate = useNavigate();

    const page = useParams();

    const page1 = useRef();
    const page2 = useRef();
    const page3 = useRef();
    const backArrow = useRef();
    const forwardArrow = useRef();

    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/items/get/${page.page == undefined ? 1 : page.page}`)
        .then(res => {
            setData(res.data.items);
            setCount(res.data.count);
            if(res.data.items.length == 0) navigate(`/dashboard/items`);
            if(res.data.count > 20){
                const active =document.querySelector('.dashboard .list .table.items .page-numbers .numbers .number.active')
                if(active !== null) active.classList.remove('active');
                if(page.page == 1 || page.page == undefined) page1.current.classList.add('active');
                if(page.page == 2) page2.current.classList.add('active');
                if(page.page == 3) page3.current.classList.add('active');
            }
        })
    },[render,update]);

    async function handleDelete(id){
        const token=localStorage.getItem('token');
        await axios.delete(`http://127.0.0.1:8000/api/items/${id}`,
        { headers: 
            { 
                'Authorization': `Bearer ${token}`
            } 
        });
        setUpdate(update + 1)
    }

    function handlePageChange(arrow){
        if(arrow == 'forward'){
            if(!(parseInt(parseInt(page.page) + 1) * 10 >= count)) navigate(`/dashboard/items/${page.page == undefined ? 2 : parseInt(page.page) + 1}`);
        }else{
            if(page.page !== 1 || page.page !== undefined) navigate(`/dashboard/items/${page.page - 1}`);
        }
    }

    return(
        <>
        <div className='table items'>
            <h3 className='info'>Showing {data.length} items from {count}</h3>
            <table>
                <thead>
                    <tr>
                        <th className='thumbnail'><span>item thumbnail</span></th>
                        <th className='product-title'>Product</th>
                        <th className='product-title'>Category</th>
                        <th className='product-title'>Company</th>
                        <th className='product-price'>Price</th>
                        <th className='product-quantity'>Quantity</th>
                        <th className='product-actions'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                Array.from(data).map((e,index) => {
                    return(
                        <tr key={index}>
                        <td className='thumbnail'><img src={e.content}></img></td>
                        <td className='title'>{e.title}</td>
                        <td className='price'>{e.category.title}</td>
                        <td className='quantity'>{e.company.title}</td>
                        <td className='quantity'>${e.price}</td>
                        <td className='quantity'>{e.count}</td>
                        <td className='actions'>
                            <div className='icons-wrapper'>
                                <Link to={`/dashboard/items/edit/${e.id}`} > <FontAwesomeIcon icon={faEdit} className='icon edit'></FontAwesomeIcon> </Link>
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
                            <Link to={`/dashboard/items`}>1</Link>
                        </li>
                        <li ref={page2} className='number'>
                            <Link to={`/dashboard/items/2`}>2</Link>
                        </li>
                        {
                            count >= 30 &&
                            <li ref={page3} className='number'>
                                <Link to={`/dashboard/items/3`}>3</Link>
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