import './Search.css';
import { Link, useParams } from 'react-router-dom'; 
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Loading from '../../Loading/Loading';

export default function Search(){

    const search = useParams();

    const [data,setData] = useState({});
    const [loading,setLoading] = useState(true);

    const empty = useRef(null);
    const notEmpty = useRef(null);
    const sort = useRef(null);

    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/items/search/${search.search}`)
        .then(res => {
            setData(res.data.items);
            setLoading(false);
            if(res.data.items.length == 0){
                notEmpty.current.style.display = 'none'
                empty.current.style.display = 'block' 
            }else{
                empty.current.style.display = 'none' 
                notEmpty.current.style.display = 'block'
            }
        })
    },[search])

    function handleSort(){
        if(sort.current.value == 1 ) setData([...data.sort((p1, p2) => {return p1.title < p2.title ? -1 : 1;})]);
        if(sort.current.value == 2 )  setData([...data.sort((p1, p2) => {return p1.title > p2.title ? -1 : 1;})]);

        if(sort.current.value == 3 ) setData([...data.sort((p1, p2) => {return p1.price < p2.price ? -1 : 1;})]);
        if(sort.current.value == 4 ) setData([...data.sort((p1, p2) => {return p1.price > p2.price ? -1 : 1;})]);
    }

    return(
        <>
        {loading ? <Loading className={''}/> : <Loading className={'hidden'}/> }
        <div ref={empty}  className='search-page empty section small'>
            <h1>No items were found</h1>
            <p>Looks like we didn't have item you searched for.</p>
            <button><Link to={`/shop`}>GO SHOPPING</Link></button>
        </div>
        <div ref={notEmpty}  className='search-page not-empty section small'>
        <div className='search-header'>
            <div className='text'>
                <h1 className='title'>{search.search}</h1>
            </div>
            <div className='info'>
                <p className='count'>Showing {data.length} items from 100</p>
                <select ref={sort} className='sort' onClick={handleSort}>
                    <option value="1">Sort from A to Z</option>
                    <option value="2">Sort from Z to A</option>
                    <option value="3">Sort by lowest price</option>
                    <option value="4">Sort by highest price</option>
                </select>
            </div>
        </div>
        <div className='search-wrapper'>
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
        </div>
        </>
    )
}