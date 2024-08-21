import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";

export default function UserRoutes(){
    const token = localStorage.getItem('token');
    const [id,setId] = useState(0);
    const [cartId,setCartId] = useState(0);
    const [role,setRole] = useState(0);
    const [render,setRender] = useState(0);

    const location = useLocation();

    useEffect(()=>{
        axios.post(`http://127.0.0.1:8000/api/auth/me`,[],{
            headers: {
                'Authorization': `Bearer ${token}` 
        }})
        .then((response) => {
            setId(response.data.user.id);
            setRole(response.data.user.role);
            response.data.user.role < 2 && setCartId(response.data.user.cart.id);
            setRender(render + 1);
        })
        .catch(err => {
            setRole(0)
            setRender(render + 1);
            console.clear();
        });
        const theme = localStorage.getItem('theme');
        if(theme == 'light') document.querySelector('body').classList.remove('dark');
        if(theme == 'dark') document.querySelector('body').classList.add('dark');
    },[location]);

    localStorage.setItem('role',role);

    if(render !== 0) return role > 1 ? <Navigate to='/dashboard'></Navigate> : <Outlet context={[role,id,cartId]}></Outlet>;
}