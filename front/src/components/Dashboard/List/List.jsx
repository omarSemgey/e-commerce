import { Link, useParams } from 'react-router-dom';
import CategoriesTable from './Categories/CategoriesTable';
import UsersTable from './Users/UsersTable';
import OrdersTable from './Orders/OrdersTable';
import ItemsTable from './Items/ItemsTable';
import { useState } from 'react';
import { useEffect } from 'react';
export default function List(){
    const page = window.location.pathname.split('/')[2];

    const route = useParams();

    const [table,setTable] = useState();
    const [render,setRender] = useState(1);

    const className = document.querySelector('.sidebar-list-item.active');

    useEffect(()=>{
        if(page == 'users' || page == 'admins' || page == 'sellers') setTable(<UsersTable render={render}></UsersTable>);
        if(page == 'categories' || page == 'companies' || page == 'branches') setTable(<CategoriesTable></CategoriesTable>);
        if(page == 'orders') setTable(<OrdersTable></OrdersTable>);
        if(page == 'items') setTable(<ItemsTable render={render}></ItemsTable>);

        window.scrollTo(0, 0);
        if(route.length == undefined) setRender(render + 1);
    },[className,route])
    return(
        <>
        <div className='list page section small'>
            <div className='page-header'>
                <Link to='/dashboard' className='link'>DASHBOARD</Link>
                <span className='slash'>/</span>
                <span className='secondary-text'>{page}</span>
                <div className='text'>
                    <h1 className='title'>{page}</h1>
                    {page !== 'orders' &&
                        <Link to={`/dashboard/${page}/create`} className='new'>add new</Link>
                    }
                </div>
            </div>
            {table}
        </div>
        </>
    )
}