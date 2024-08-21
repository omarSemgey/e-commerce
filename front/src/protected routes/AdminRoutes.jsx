import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoutes(){
    const token=localStorage.getItem('token');
    const role=localStorage.getItem('role');
    if(token !== null) {
        return role > 2 ? <Outlet/> : (role > 1 ? <Navigate to='/dashboard'></Navigate> : <Navigate to='/'></Navigate>);
    }else{
        return <Navigate to='/sign'></Navigate>
    }
}