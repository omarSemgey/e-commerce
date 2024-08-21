import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UsersForm from './Users/UsersForm';
import CategoriesForm from './Categories/CategoriesForm';
import OrdersForm from './Orders/OrdersForm';
import ItemsForm from './Items/ItemsForm';
export default function Form({type}){
    const page = window.location.pathname.split('/')[2];
    const [form,setForm] = useState();
    const className = document.querySelector('.sidebar-list-item.active');
    useEffect(()=>{
        if(page == 'users' || page == 'admins' || page == 'sellers') setForm(<UsersForm type={type}></UsersForm>)
        if(page == 'categories' || page == 'companies' || page == 'branches') setForm(<CategoriesForm type={type}></CategoriesForm>)
        if(page == 'orders') setForm(<OrdersForm type={type}></OrdersForm>)
        if(page == 'items') setForm(<ItemsForm type={type}></ItemsForm>)
    },[className])
    return(
        <>
        <div className='create page section small'>
            <div className='page-header'>
                <Link to='/dashboard' className='link'>DASHBOARD</Link>
                <span className='slash'>/</span>
                <span className='secondary-text'>Edit</span>
                <span className='slash'>/</span>
                <span className='secondary-text'>{page}</span>
                <div className='text'>
                    <h1 className='title'>{page}</h1>
                    <Link to={`/dashboard/${page}`} className='new'>see all</Link>
                </div>
            </div>
            {form}
        </div>
        </>
    )
}