import './Container.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useEffect, useState } from 'react';
export default function Container(){

    const [category,setCategory] = useState({});
    const [items,setItems] = useState({});

    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/categories/1`)
        .then(res => {
            setCategory(res.data.category);
            setItems(res.data.category.items);
        });
    },[])

    return(
        <>
        <div className='section container'>
            <div className='content'>
                <div className='title'>
                    <h4 className='main-text'>{category.title}</h4>
                    <Link to={`/shop/categories/${category.title}`} className='link'>see more</Link>
                </div>
                <ul className='items'>
                    {
                        Array.from(items).map((e,index) => {
                            return(
                                <li className='item' key={index}>
                                    <Link to={`/items/${e.id}`}>
                                        <img src={e.content} alt="" />
                                    </Link>
                                    <div className='text'>
                                        <Link to={`/items/${e.id}`} className='main-text'>{e.title}</Link>
                                        <span className='sale'>${e.price}</span>
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
        </div>
        </div>
        </>
    )
}