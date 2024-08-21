import './Shop.css';
import Products from '../Products/Products';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Shop(){

    const [categories,setCategories] = useState({});
    const [render,setRender] = useState(1);

    let id = useParams();
    useEffect(()=>{
        window.scrollTo(0, 0);
        axios.get(`http://127.0.0.1:8000/api/categories`)
        .then(res => {
            setCategories(res.data.categories);
        });
        if(id.length == undefined) setRender(render + 1);
    },[id]);

    return(
        <>
        <div className='shop section small'>
            <div className='left-nav'>
                <h5 className='title'>Categories</h5>
                <ul className='nav'>
                    {
                        Array.from(categories).map((e,index) => {
                            return(
                            <li key={index} className='nav-link'>
                                <Link onClick={()=>{setRender(render + 1)}} to={`/shop/categories/${e.title}`}>{e.title}</Link>
                            </li>
                            )
                        })
                    }
                </ul>
            </div>
            <Products render={render}></Products>
        </div>
        </>
    )
}