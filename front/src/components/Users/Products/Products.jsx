import './Products.css';
import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Loading from '../../Loading/Loading';

export default function Products({render}){

    const page = useParams();

    const navigate = useNavigate();

    const [data,setData] = useState({});
    const [description,setDescription] = useState('');
    const [count,setCount] = useState(0);
    const [loading,setLoading] = useState(true);

    const sort = useRef();
    const page1 = useRef();
    const page2 = useRef();
    const page3 = useRef();
    const backArrow = useRef();
    const forwardArrow = useRef();

    useEffect(()=>{
        if(page.category !== undefined){
            axios.get(`http://127.0.0.1:8000/api/categories/showItems/${page.category}/${page.page == undefined ? 1 : page.page}`)
            .then(res => {
                setData(Array.from(res.data.category.items).filter(item => item.count > 1));
                setDescription(res.data.category.description);
                setCount(res.data.category.items_count);
                setLoading(false);
                (parseInt(parseInt(page.page) + 1) * 10 >= res.data.count) ? forwardArrow.current.classList.remove('active') : forwardArrow.current.classList.add('active');
                if(res.data.category.length == 0) navigate(`/shop`);
            });
        }else{
            axios.get(`http://127.0.0.1:8000/api/items/get/${page.page == undefined ? 1 : page.page}`)
            .then(res => {
                setData(res.data.items);
                setCount(res.data.count);
                setLoading(false);
                if(res.data.items.length == 0) navigate(`/shop`);
                if(res.data.count > 20){
                    document.querySelector('.users .page-numbers .number.active').classList.remove('active');
                    if(page.page == 1 || page.page == undefined) page1.current.classList.add('active');
                    if(page.page == 2) page2.current.classList.add('active');
                    if(page.page == 3) page3.current.classList.add('active');
                }
            })
        }

    },[render])

    function handleSort(){
        if(sort.current.value == 1 ) setData([...data.sort((p1, p2) => {return p1.title < p2.title ? -1 : 1;})]);
        if(sort.current.value == 2 )  setData([...data.sort((p1, p2) => {return p1.title > p2.title ? -1 : 1;})]);

        if(sort.current.value == 3 ) setData([...data.sort((p1, p2) => {return p1.price < p2.price ? -1 : 1;})]);
        if(sort.current.value == 4 ) setData([...data.sort((p1, p2) => {return p1.price > p2.price ? -1 : 1;})]);
    }

    function handlePageChange(arrow){
        if(page.category == undefined){
            if(arrow == 'forward'){
                if(!(parseInt(parseInt(page.page) + 1) * 10 >= count)) navigate(`/shop/${page.page == undefined ? 2 : parseInt(page.page)  + 1}`);
            }else{
                if(page.page !== 1 || page.page !== undefined) navigate(`/shop/${page.page - 1}`);
            }
        }else{
            if(arrow == 'forward'){
                if(!(parseInt(parseInt(page.page) + 1) * 10 >= count)) navigate(`/shop/categories/${page.category}/${page.page == undefined ? 2 : parseInt(page.page) + 1}`);
            }else{
                if(page.page !== 1 || page.page !== undefined) navigate(`/shop/categories/${page.category}/${page.page - 1}`);
            }
        }
    }

    return(
        <>
        <div className='products'>
        {loading ? <Loading className={''}/> : <Loading className={'hidden'}/>}
        <div className='products-header'>
            <div className='text'>
                <h1 className='title'>{page.category !== undefined ? page.category : 'Shop'}</h1>
                {page.category !== undefined && 
                <p className='secondary-text'>{description}</p>
                }
                </div>
            <div className='info'>
                <p className='count'>Showing {data.length} items from {count}</p>
                <select onChange={handleSort} ref={sort} className='sort'>
                    <option value="1">Sort from A to Z</option>
                    <option value="2">Sort from Z to A</option>
                    <option value="3">Sort by lowest price</option>
                    <option value="4">Sort by highest price</option>
                </select>
            </div>
        </div>
        <div className='products-wrapper'>
        {
            Array.from(data).map((e,index) => {
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
                            <Link to={`/shop`}>1</Link>
                        </li>
                        <li ref={page2} className='number'>
                            <Link to={`/shop/2`}>2</Link>
                        </li>
                        {
                            count >= 30 &&
                            <li ref={page3} className='number'>
                                <Link to={`/shop/3`}>3</Link>
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
