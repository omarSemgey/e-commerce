import { useState, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import axios from 'axios';
export default function DashboardRoutes(){
    const token = localStorage.getItem('token');
    const [role,setRole] = useState(0);
    const [render,setRender] = useState(0);

    const location = useLocation();

    useEffect(()=>{
        axios.post(`http://127.0.0.1:8000/api/auth/me`,[],{
            headers: {
                'Authorization': `Bearer ${token}` 
        }})
        .then((response) => {
            response.data.user.role == undefined  ? setRole(0) : setRole(response.data.user.role);
            setRender(render + 1)
        })
        .catch(err => {
            setRole(0)
            setRender(render + 1);
            console.clear();
        });
    },[location])

        if(token == null) return <Navigate to='/sign'></Navigate>

        localStorage.setItem('role',role);

        if(render !== 0) return role < 2 ? <Navigate to='/'></Navigate> : <Outlet context={role}></Outlet>;
}
