import './Item.css';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Link , useNavigate, useOutletContext, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Item(){

    const itemId = useParams();

    const navigate = useNavigate();

    const input = useRef();
    const currentImg = useRef();

    const context = useOutletContext();

    const token = localStorage.getItem('token');

    const [data,setData] = useState({});
    const [items,setItems] = useState({});
    const [error,setError] = useState('');
    const [success,setSuccess] = useState('');

    useEffect(()=>{
        window.scrollTo(0, 0);
        axios.get(`http://127.0.0.1:8000/api/items/${itemId.id}`)
        .then(res => {
            setData(res.data.item);
        });
        if(data.category_id !== undefined){
            axios.get(`http://127.0.0.1:8000/api/categories/${data.category_id}`)
            .then(res => {
                setItems(res.data.category.items.splice(0,4));
        });
        }
    },[itemId.id,data.category_id]);

    function handlePurchase(){
        if(token == null){
        setError('active')
        }else{
            axios.post(`http://127.0.0.1:8000/api/orders`,{
            user_id: context[0],
            price: data.price,
            status: 0,
            items: [
                {
                    id: itemId.id,
                    count: input.current.value > 1 && input.current.value < data.count ? input.current.value : 1,
                }
            ],
            },{
                headers: {
                    'Authorization': `Bearer ${token}`,
            }})
            .then(res =>{
                setSuccess('active')
            })
        } 
    }

    async function handleCart(){
        if(token == null){
            setError('active')
        }else{
            const res = await axios.get(`http://127.0.0.1:8000/api/users/${context[1]}`)
            axios.put(`http://127.0.0.1:8000/api/carts/${res.data.user.cart.id}`,{
        item: itemId.id
        },{
            headers: {
                'Authorization': `Bearer ${token}`,
            }})
            .then(res =>{
                navigate('/cart')
            });
        }

    }

    function handleInput(arrow){
        if(arrow === 'up'){
            if(input.current.value < data.count) input.current.value ++;
        }else{
            if(input.current.value > 0) input.current.value -=1;
        }
    }

    function checkInput(){
        if(input.current.value < data.count) input.current.value = data.count;
    }

    // function changeImg(img){
    //     if(img.target.src !== undefined){
    //         currentImg.current.src =img.target.src;
    //     }else{
    //         currentImg.current.src = img.target.children[0];
    //     }
    // }

    return(
        <>
        <div className='show section small'>
            <div className={`error pop-up ${error}`}>
                <h1>You are not logged in</h1>
                <p>You cant purchase items without logging in.</p>
                <button><Link to={'/sign'}>Login Or register</Link></button>
            </div>
            <div className={`success pop-up ${success}`}>
                <h1>Purchase completed successfully</h1>
                <p>Your order has been taken.</p>
                <button><Link to={'/shop'}>Continue Shopping</Link></button>
            </div>
            <div className='info'>
                {/* <ul className='slider'>
                    <li className='image' onClick={(e)=>changeImg(e)}>
                        <img src={data.content} alt="" />
                    </li>
                    <li className='image' onClick={(e)=>changeImg(e)}>
                        <img src={data.content} alt="" />
                    </li>
                    <li className='image' onClick={(e)=>changeImg(e)}>
                        <img src={data.content} alt="" />
                    </li>
                </ul> */}
                <div className='main-image image'>
                    <img ref={currentImg} src={data.content} alt="" />
                </div> 
                <div className='text'>
                    <span className='category'>{data.category !== undefined && data.category.title}</span>
                    <h1 className='title'>{data.title}</h1>
                    <p className='secondary-text'>{data.description}</p>
                    <div className='purchase-info'>
                        <p className='price'>${data.price}</p>
                        <div className='quantity'>
                            <span>Quantity:</span>
                            <input onChange={checkInput} type="number" ref={input} min={0} step={1} max={data.count} defaultValue={1}/>
                            <div className='arrows'>
                                <div className='arrow-wrapper up' onClick={()=>handleInput('up')}>
                                    <FontAwesomeIcon icon={faChevronUp} className='icon'></FontAwesomeIcon>
                                </div>
                                <div className='arrow-wrapper down' onClick={()=>handleInput('down')} >
                                    <FontAwesomeIcon icon={faChevronDown} className='icon'></FontAwesomeIcon>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='actions'>
                        <button className='buy' onClick={handlePurchase}>Purchase</button>
                        <button className='basket' onClick={handleCart}>Add to cart</button>
                    </div>
                </div>
            </div>
            <div className='similar-items section small'>
            <div className='title'>
                <h3>Similar Items</h3>
            </div>
            <ul className='items'>
            {
                Array.from(items).map((e,index) => {
                    return(
                        <li key={index} className='item'>
                        <Link to={`/items/${e.id}`}>
                            <img src={e.content} alt="" />
                        </Link>
                        <div className='text'>
                        <div className='prices'>
                            <span className='sale active'>${data.price}</span>
                        </div>
                            <Link to={`/items/${e.id}`} className='main-text'>{e.title}</Link>
                        </div>
                    </li>
                    )
                })
            }
            </ul>
            </div>
        </div>
        </>
    )
}