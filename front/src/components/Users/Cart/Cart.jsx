import './Cart.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faX } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { useEffect ,useRef,useState } from 'react'
import axios from 'axios';
import Loading from '../../Loading/Loading'

export default function cart(){

    const empty = useRef(null);
    const notEmpty = useRef(null);

    const [items,setItems] = useState([]);
    // const [cartId,setCartId] = useState(0);
    const [render,setRender] = useState(0);
    const [loading,setLoading] = useState(true);
    const [success,setSuccess] = useState('');

    const orderItems = [];

    let total = 0;

    const navigate = useNavigate()

    const token = localStorage.getItem('token');

    const context = useOutletContext();

    useEffect(()=>{
        if(token == null ) navigate('/sign');
        // const fetchItems = async () => {
        //     if(userId !== 0 && userId !== undefined){
        //         // const res = await axios.get(`http://127.0.0.1:8000/api/users/${userId}`);
        //         // setCartId(res.data.user.cart.id)
        //         axios.get(`http://127.0.0.1:8000/api/carts/${cartId[1]}`)
        //         .then((response) => {
        //             setItems(response.data.cart.items);
        //             setLoading(false);
        //             if(response.data.cart.items.length == 0){
        //                 notEmpty.current.style.display = 'none'
        //                 empty.current.style.display = 'block' 
        //             }else{
        //                 empty.current.style.display = 'none' 
        //                 notEmpty.current.style.display = 'block'
        //             }
        //         });
        //     }
        // };
        // fetchItems();
        axios.get(`http://127.0.0.1:8000/api/carts/${context[1]}`)
        .then((response) => {
            setItems(response.data.cart.items);
            setLoading(false);
            if(response.data.cart.items.length == 0){
                notEmpty.current.style.display = 'none'
                empty.current.style.display = 'block' 
            }else{
                empty.current.style.display = 'none' 
                notEmpty.current.style.display = 'block'
            }
        });
    },[render])

    function handleInput(arrow,max,id,price){
        const input = document.getElementById(`${id}`);
        const subTotal = document.getElementById(`total${id}`);
        const totalElement = document.querySelector('.cart-payment .cart-totals .cart-subtotal .subtotal')
        let currentPrice = parseInt(subTotal.innerHTML.slice(1));

        if(arrow === '+'){
            if(input.value < max){ 
                input.value ++;
                currentPrice +=  price;
                total +=  price;
            }
        }else{
            if(input.value > 1){
                input.value -=1;
                currentPrice -= price;
                total -=  price;
            } 
        }

        subTotal.innerHTML = `$${currentPrice}`;
        totalElement.innerHTML = `$${total}`;
    }

    function handleDelete(item){
        axios.post(`http://127.0.0.1:8000/api/carts/deleteItem/${context[0]}`,{
            item: item,
        },{
            headers: {
                'Authorization': `Bearer ${token}` 
        }})
        .then(res => {
            setRender(render + 1)
        });
    }

    function handleCheckout(){ 
        items.forEach(item => {
            const input = document.getElementById(`${item.id}`);
            if(input.value > 0 && input.value <= item.count){
                orderItems.push({
                    id: item.id,
                    count: input.value,
                });
            }
        });
        axios.post(`http://127.0.0.1:8000/api/orders`,{
            user_id: context[0],
            price: total,
            status: 0,
            items: orderItems
            },{
                headers: {
                    'Authorization': `Bearer ${token}`,
        }})
        axios.post(`http://127.0.0.1:8000/api/carts/clear/${context[0]}`,[],{
            headers: {
                'Authorization': `Bearer ${token}` 
        }})
        .then(res => {
            setSuccess('active');
            setRender(render + 1)
        })
    }

    // function handleCoupon(){
    //     coupon.current.classList.add('active')
    // }

    return(
        <>
        {loading ? <Loading className={''}/> : <Loading className={'hidden'}/> }
        <div className={`success pop-up ${success}`}>
                <h1>Checkout completed successfully</h1>
                <p>Items was bought successfully.</p>
                <button><Link to={'/shop'}>Continue Shopping</Link></button>
        </div>
        <div ref={empty} className='cart empty section small'>
            <FontAwesomeIcon icon={faCartPlus} className='icon'></FontAwesomeIcon>
            <h1>Your cart is empty</h1>
            <p>Looks like you haven't added any products to your cart yes.</p>
            <button><Link to={`/shop`}>GO SHOPPING</Link></button>
        </div>
        <div ref={notEmpty} className='cart not-empty section small'>
            <h1 className='title'>Cart</h1>
            <div className='cart-wrapper'>
                <div className='cart-content'>
                    <table>
                        <thead>
                            <tr>
                                <th className='remove'></th>
                                <th className='thumbnail'>thumbnail</th>
                                <th className='product-title'>Product</th>
                                <th className='product-price'>Price</th>
                                <th className='product-quantity'>Quantity</th>
                                <th className='product-Subtotal'>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items.map((e,index) => {
                                    total += e.price;
                                    return(
                                    <tr key={index}>
                                        <td data-title='Control' className='remove'><FontAwesomeIcon icon={faX} onClick={()=>handleDelete(e.id)}></FontAwesomeIcon></td>
                                        <td data-title='thumbnail' className='thumbnail'><Link to={`/items/${e.id}`}><img src={e.content}></img></Link></td>
                                        <td data-title='Product' className='product-title'><Link to={`/items/${e.id}`}>{e.title}</Link></td>
                                        <td data-title='Price' className='product-price'>${e.price}</td>
                                        <td data-title='Quantity' className='product-quantity'>
                                            <div className='quantity-wrapper'>
                                                <button onClick={()=>handleInput('-',e.count,e.id,e.price)} className='control'>-</button>
                                                <input id={e.id} type="number" defaultValue={1} min={'1'} max={e.count} size={3} inputMode='numeric'/>
                                                <button onClick={()=>handleInput('+',e.count,e.id,e.price)} className='control'>+</button>
                                            </div>
                                        </td>
                                        <td data-title='Total' className='product-Subtotal' id={`total${e.id}`}>${e.price}</td>
                                    </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className='cart-payment'>
                    <div className='cart-totals'>
                        <h2 className='main-text'>Cart totals</h2>
                        <table>
                            <tbody>
                                <tr className='cart-subtotal'>
                                    <th>Total</th>
                                    <td className='subtotal'>${total}</td>
                                </tr>   
                            </tbody>
                        </table>
                        {/* <div ref={coupon} className='coupon'> */}
                            {/* <p onClick={handleCoupon}>Have a coupon?</p> */}
                            {/* <div className='coupon-enter'> */}
                                {/* <input type="text" placeholder='Coupon code'/> */}
                                {/* <button>Apply</button> */}
                            {/* </div> */}
                        {/* </div> */}
                        <button className='checkout' onClick={handleCheckout}>Proceed to checkout</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}