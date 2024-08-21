import './Dashboard.css';
import LeftNav from './LeftNav/LeftNav';
import { Outlet, useOutletContext } from 'react-router-dom'

export default function Dashboard(){
    const role = useOutletContext();
    return(
        <>
        <div className='dashboard'>
            <LeftNav role={role}></LeftNav>
            <Outlet></Outlet>
        </div>
        </>
    )
}