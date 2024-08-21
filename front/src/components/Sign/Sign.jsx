import './Sign.css';
import Footer from '../Users/Footer/Footer';
import Header from '../Users/Header/Header';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Sign(){
    //###hooks###
    const navigate= useNavigate();
    //###inputs###
    //login inputs
    const logEmail = useRef();
    const logPassword = useRef();
    ///register inputs
    const regName = useRef();
    const regEmail = useRef();
    const regPassword = useRef();
    //###errors###
    //login errors
    const [logNotFound,setLogNotFound] = useState('none');
    const [logEmailError,setLogEmailError] = useState('none');
    const [logPasswordError,setLogPasswordError] = useState('none');
    //register error
    const [regNameError,setRegNameError] = useState('none');
    const [regEmailError,setRegEmailError] = useState('none');
    const [regPasswordError,setRegPasswordError] = useState('none');
    const [regUsedEmail,setRegUsedEmail] = useState('none');

    //functions

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token !== null){
            axios.post(`http://127.0.0.1:8000/api/auth/me`,[],{
                headers: {
                    'Authorization': `Bearer ${token}` 
                }})
                .then((response) => {
                    localStorage.setItem('role',response.data.role)
                    return response.data.role > 1 ? navigate('/dashboard') : navigate('/');
            });
        }
    },[])

    function login(e){
        e.preventDefault();
        axios.post(`http://127.0.0.1:8000/api/auth/login`,{
            email: logEmail.current.value,
            password: logPassword.current.value,
        })
        .then((response) => {
            localStorage.setItem('token',response.data.authorization.token);
            localStorage.setItem('role',response.data.role)
            response.data.role > 1 ? navigate('/dashboard')  : navigate('/') 
        })
        .catch(error => {
            const status = error.response.status;
            let email;
            let password;

            if(error.response.data.errors) email =  'email' in error.response.data.errors;
            if(error.response.data.errors) password =  'password' in error.response.data.errors;
            status == 401 ? setLogNotFound('block') : setLogNotFound('none');
            email ? setLogEmailError('block') : setLogEmailError('none');
            password ? setLogPasswordError('block') : setLogPasswordError('none');

            console.clear();
        });
    }

    function register(e){
        e.preventDefault();
        axios.post(`http://127.0.0.1:8000/api/auth/register`,{
            name: regName.current.value,
            email: regEmail.current.value,
            password: regPassword.current.value,
            role: 1,
        })
        .then((response) => {
            localStorage.setItem('token',response.data.authorization.token);
            localStorage.setItem('role',response.data.role);
            navigate('/'); 
        })
        .catch(error => { 
            const message = error.response.data.message;
            let email;
            let name;
            let password;
            if(error.response.data.errors !== null) email = 'email' in error.response.data.errors;
            if(error.response.data.errors !== null) name = 'name' in error.response.data.errors;
            if(error.response.data.errors !== null) password = 'password' in error.response.data.errors;

            message == 'The email has already been taken.' ? setRegUsedEmail('block') : setRegUsedEmail('none');
            name ? setRegNameError('block') : setRegNameError('none');
            email && message !== 'The email has already been taken.' ? setRegEmailError('block') : setRegEmailError('none');
            password ? setRegPasswordError('block') : setRegPasswordError('none');

            console.clear();
        });
    }

    return(
        <>
        <Header></Header>
        <div className='sign'>
            <div className='sign-wrapper'>
                <div className='login'>
                    <h3 className='main-text'>Login</h3>
                    <p className='secondary-text'>Welcome back! Sign in to your account!</p>
                    <form action="">
                        <input ref={logEmail} type="text" placeholder='Email'/>
                        <p style={{'display':logEmailError}} className='error'>Please enter a valid Email Address</p>
                        <input ref={logPassword} type="text" placeholder='Password'/>
                        <p style={{'display':logPasswordError}} className='error'>Please enter a valid password</p>
                        <p style={{'display':logNotFound}} className='error'>User not found</p>
                        <button onClick={(e)=>login(e)}>Login</button>
                        <div className='remember'>
                            <label htmlFor="remember">Remember me</label>
                            <input type="checkbox" id='remember' />
                        </div>
                    </form>
                </div>
                <div className='register'>
                    <h3 className='main-text'>Register</h3>
                    <p className='secondary-text'>Create your very own account</p>
                    <form action="">
                        <input ref={regName} type="text" placeholder='Username'/>
                        <p style={{'display':regNameError}} className='error'>Please enter a valid name</p>
                        <input ref={regEmail} type="text" placeholder='Email Address'/>
                        <p style={{'display':regEmailError}} className='error'>Please enter a valid Email Address</p>
                        <p style={{'display':regUsedEmail}} className='error'>Email is already used</p>
                        <input ref={regPassword} type="text" placeholder='Password'/>
                        <p style={{'display':regPasswordError}} className='error'>Please enter a valid password</p>
                        <button onClick={(e)=>register(e)} >Register</button>
                    </form>
                </div>
            </div>
        </div>
        <Footer></Footer>
        </>
    )
}