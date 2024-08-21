import '../Form.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRef } from 'react';
export default function CategoriesForm({type}){
    //###hooks###
    const navigate= useNavigate();
    //###inputs###
    const title = useRef();
    const description = useRef();
    //###errors###
    const [titleError,setTitleError] = useState('none');
    const [descriptionError,setDescriptionError] = useState('none');

    const page = window.location.pathname.split('/')[2];
    const id = window.location.pathname.split('/')[4];
    //##################on update###################
    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/${page}/${id}`)
        .then(res => {
            const data = page == 'categories' ? 'category' : (page == 'companies' ? 'company' : 'branch');
            title.current.value = res.data[data].title;
            description.current.value = res.data[data].description;
        })
    },[]);
    function handleCreate(e){
        e.preventDefault();
        const token = localStorage.getItem('token')
        if(type !== 'edit'){
            axios.post(`http://127.0.0.1:8000/api/${page}`,{
                title: title.current.value,
                description: description.current.value,
            },{
                headers: {
                    'Authorization': `Bearer ${token}` 
                }})
            .then((response) => {
                navigate(`/dashboard/${page}`)
            })
            .catch(error => { 
                handleError(error);
                console.clear();
            });
        }else{
            axios.put(`http://127.0.0.1:8000/api/${page}/${id}`,{
                title: title.current.value,
                description: description.current.value,
            },{
                headers: {
                    'Authorization': `Bearer ${token}` 
                }})
            .then((response) => {
                navigate(`/dashboard/${page}`)
            })
            .catch(error => { 
                handleError(error);
                console.clear();
            });
        }
    }
    function handleError(error){
        let title;
        let description;
        if(error.response.data.errors !== null) title = 'title' in error.response.data.errors;
        if(error.response.data.errors !== null) description = 'description' in error.response.data.errors;

        title ? setTitleError('block') : setTitleError('none');
        description ? setDescriptionError('block') : setDescriptionError('none');
    }
    return(
        <>
        <div className='form Users'>
            <h3 className='main-text'>Create {page}</h3>
                <form action="">
                    <input ref={title} type="text" placeholder='Title'/>
                    <p style={{'display':titleError}} className='error'>Please enter a valid Title</p>
                    <input ref={description} type="text" placeholder='Description'/>
                    <p style={{'display':descriptionError}} className='error'>Please enter a valid Description</p>
                    <button onClick={(e)=>handleCreate(e)} >Create {page}</button>
                </form>
        </div>
        </>
    )
}