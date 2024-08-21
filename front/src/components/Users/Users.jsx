import './Users.css';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { Outlet, useOutletContext } from 'react-router-dom';
export default function Users(){
    const context = useOutletContext();
    return(
        <>
        <div className="users">
        <Header role={context[0]}></Header>
        <Outlet context={[context[1],context[2]]}></Outlet>
        <Footer role={context[0]}></Footer>
        </div>
        </>
    )
}