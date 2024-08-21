import '../Form.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRef } from 'react';
export default function UsersForm({type}){
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

    const page = window.location.pathname.split('/')[2];
    const id = window.location.pathname.split('/')[4];
    //##################on update###################
    if(type == 'edit'){
        useEffect(()=>{
            axios.get(`http://127.0.0.1:8000/api/users/${id}`)
            .then(res => {
                name.current.value = res.data.user.name;
                email.current.value = res.data.user.email;
            })
    },[]);
    }

    function handleSubmit(e){
        e.preventDefault();
        const token = localStorage.getItem('token')
        if(type !== 'edit'){
            axios.post(`http://127.0.0.1:8000/api/users`,{
                name: name.current.value,
                email: email.current.value,
                password: password.current.value,
                role: page == 'users' ? 1 : 3,
            },{
                headers: {
                    'Authorization': `Bearer ${token}` 
                }})
            .then((response) => {
                navigate('/dashboard/users')
            })
            .catch(error => { 
                handleError(error);
                console.clear();
            });
        }else{
            axios.put(`http://127.0.0.1:8000/api/users/${id}`,{
                name: name.current.value,
                email: email.current.value,
                password: password.current.value,
            },{
                headers: {
                    'Authorization': `Bearer ${token}` 
                }})
            .then((response) => {
                navigate(`/dashboard/${page}`)
            })
            .catch(error => { 
                checkErrors(error);
                console.clear();
            });
        }
    }

    function handleError(error){
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
    }
    return(
        <>
        <div className='form Users'>
            <h3 className='main-text'>{type == 'edit' ? 'Edit' : 'Create'} {page == 'users' ? 'user' : 'admin'}</h3>
                <form action="">
                    <input ref={name} type="text" placeholder='Username'/>
                    <p style={{'display':nameError}} className='error'>Please enter a valid name</p>
                    <input ref={email} type="text" placeholder='Email Address'/>
                    <p style={{'display':emailError}} className='error'>Please enter a valid Email Address</p>
                    <p style={{'display':usedEmail}} className='error'>Email is already used</p>
                    <input ref={password} type="text" placeholder='Password'/>
                    <p style={{'display':passwordError}} className='error'>Please enter a valid password</p>
                    <button onClick={(e)=>handleSubmit(e)} >{type == 'edit' ? 'Edit' : 'Create'} {page == 'users' ? 'user' : 'admin'}</button>
                </form>
        </div>
        </>
    )
}