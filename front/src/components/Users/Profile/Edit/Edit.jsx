import './Edit.css'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRef } from 'react';
export default function Edit(){
    //###hooks###
    const navigate= useNavigate();
    //###inputs###
    const name = useRef();
    const email = useRef();
    const password = useRef();
    //###errors###
    const [nameError,setNameError] = useState('none');
    const [emailError,setEmailError] = useState('none');
    const [passwordError,setPasswordError] = useState('none');
    const [usedEmail,setUsedEmail] = useState('none');

    const token = localStorage.getItem('token');

    const id = useOutletContext();

    useEffect(()=>{
        if(token == null) navigate('/sign');
        axios.get(`http://127.0.0.1:8000/api/users/${id[0]}`)
        .then(res => {
            name.current.value = res.data.user.name;
            email.current.value = res.data.user.email;
        })
    },[]);

    function createUser(e){
        e.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/users/${id}`,{
            name: name.current.value,
            email: email.current.value,
            password: password.current.value,
        },{
            headers: {
                'Authorization': `Bearer ${token}` 
            }})
        .then((response) => {
            navigate('/profile');
        })
        .catch(error => { 
            const message = error.response.data.message;
            let email;
            let name;
            let password;
            if(error.response.data.errors !== null) email = 'email' in error.response.data.errors;
            if(error.response.data.errors !== null) name = 'name' in error.response.data.errors;
            if(error.response.data.errors !== null) password = 'password' in error.response.data.errors;
    
            message == 'The email has already been taken.' ? setUsedEmail('block') : setUsedEmail('none');
            name ? setNameError('block') : setNameError('none');
            email && message !== 'The email has already been taken.' ? setEmailError('block') : setEmailError('none');
            password ? setPasswordError('block') : setPasswordError('none');
            console.clear();
        });
    }

    return(
        <>
        <div className='edit section small'>
            <h1 className='title'>Edit profile information:</h1>
            <div className='form'>
                <h3 className='main-text'>Edit Profile</h3>
                <form action="">
                    <input ref={name} type="text" placeholder='Username'/>
                    <p style={{'display':nameError}} className='error'>Please enter a valid name</p>
                    <input ref={email} type="text" placeholder='Email Address'/>
                    <p style={{'display':emailError}} className='error'>Please enter a valid Email Address</p>
                    <p style={{'display':usedEmail}} className='error'>Email is already used</p>
                    <input ref={password} type="text" placeholder='Password'/>
                    <p style={{'display':passwordError}} className='error'>Please enter a valid password</p>
                    <button onClick={(e)=>createUser(e)} >Edit</button>
                </form>
            </div>
        </div>
        </>
    )
}