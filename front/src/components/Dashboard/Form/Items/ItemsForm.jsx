import './ItemsForm.css'
import '../Form.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import axios from 'axios';
export default function ItemsForm({type}){
    //###hooks###
    const navigate= useNavigate();
    //###refs###
    //##inputs##
    const title = useRef();
    const description = useRef();
    const content = useRef();
    const count = useRef();
    const price = useRef();
    const companyId = useRef();
    const categoryId = useRef();
    //##img##
    const img = useRef();
    //###states###
    //##errors##
    const [titleError,setTitleError] = useState('none');
    const [descriptionError,setDescriptionError] = useState('none');
    const [contentError,setContentError] = useState('none');
    const [countError,setCountError] = useState('none');
    const [priceError,setPriceError] = useState('none');
    const [companyIdError,setCompanyIdError] = useState('none');
    const [categoryIdError,setCategoryId] = useState('none');
    //##img##
    const [state,setState] = useState('')

    const [companies,setCompanies] = useState({});
    const [categories,setCategories] = useState({});
    //##################on update###################
    const id = window.location.pathname.split('/')[4];
    const [item,setItem] = useState(null);

    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/categories`)
        .then(res => {
            setCategories(res.data.categories)
        })
        axios.get(`http://127.0.0.1:8000/api/companies`)
        .then(res => {
            setCompanies(res.data.companies)
        })
        if(type == 'edit'){
            axios.get(`http://127.0.0.1:8000/api/items/${id}`)
            .then(res => {
                setItem(res.data.item)
                setState('active');
                title.current.value = res.data.item.title;
                description.current.value = res.data.item.description;
                count.current.value = res.data.item.count;
                price.current.value = res.data.item.price;
                img.current.src = res.data.item.content;
            })
        }
    },[]);
    function handleCreate(e){
        e.preventDefault();
        const token = localStorage.getItem('token')
        if(type !== 'edit'){
            axios.post(`http://127.0.0.1:8000/api/items`,{
                title: title.current.value,
                description: description.current.value,
                description: description.current.value,
                content: content.current.files[0],
                count: count.current.value,
                price: price.current.value,
                company_id: companyId.current.value,
                category_id: categoryId.current.value,
            },{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }})
            .then((response) => {
                navigate(`/dashboard/items`)
            })
            .catch(error => { 
                handleError(error);
                console.clear();
            });
        }else{
            axios.put(`http://127.0.0.1:8000/api/items/${id}`,{
                title: title.current.value,
                description: description.current.value,
                description: description.current.value,
                content: content.current.files[0],
                count: count.current.value,
                price: price.current.value,
                company_id: companyId.current.value,
                category_id: categoryId.current.value,
            },{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }})
            .then((response) => {
                navigate(`/dashboard/items`)
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
        let content;
        let count;
        let price;
        let companyId;
        let categoryId;

        if(error.response.data.errors !== null) title = 'title' in error.response.data.errors;
        if(error.response.data.errors !== null) description = 'description' in error.response.data.errors;
        if(error.response.data.errors !== null) content = 'content' in error.response.data.errors;
        if(error.response.data.errors !== null) count = 'count' in error.response.data.errors;
        if(error.response.data.errors !== null) price = 'price' in error.response.data.errors;
        if(error.response.data.errors !== null) companyId = 'company_id' in error.response.data.errors;
        if(error.response.data.errors !== null) categoryId = 'category_id' in error.response.data.errors;

        title ? setTitleError('block') : setTitleError('none');
        description ? setDescriptionError('block') : setDescriptionError('none');
        content ? setContentError('block') : setContentError('none');
        count ? setCountError('block') : setCountError('none');
        price ? setPriceError('block') : setPriceError('none');
        companyId ? setCompanyIdError('block') : setCompanyIdError('none');
        categoryId ? setCategoryId('block') : setCategoryId('none');
    }
    function handleCount(arrow){
        if(arrow === '+'){
            if(count.current.value < 9999) count.current.value ++;
        }else{
            if(count.current.value > 1) count.current.value -=1;
        }
    }
    function handlePrice(arrow){
        if(arrow === '+'){
            if(price.current.value < 9999) price.current.value ++;
        }else{
            if(price.current.value > 1) price.current.value -=1;
        }
    }
    function handleImg(){
        const file = content.current.files[0];
        const types = ["image/jpeg", "image/jpg", "image/png"];
        const fileType = file.type;
        img.current.src = URL.createObjectURL(file);
        if(!file || !types.includes(fileType)){
            setState('error');
            setContentError('block')
        }else{
            setContentError('none')
            setState('active');
        }
    }
    return(
        <>
        <div className='form items'>
            <h3 className='main-text'>{type == 'edit' ? 'Edit' : 'Create'} item</h3>
                <form action="">
                    <input ref={title} type="text" placeholder='Title'/>
                    <p style={{'display':titleError}} className='error'>Please enter a valid Title</p>
                    <input ref={description} type="text" placeholder='Description'/>
                    <p style={{'display':descriptionError}} className='error'>Please enter a valid Description</p>
                    <div className='number'>
                        <span onClick={()=>handleCount('-')} className='control'>-</span>
                        <input placeholder='Item count' ref={count} type="number" min={'0'} max={'9999'} size={4} inputMode='numeric'/>
                        <span onClick={()=>handleCount('+')} className='control'>+</span>
                    </div>
                    <p style={{'display':countError}} className='error'>Please enter a valid Quantity</p>
                    <div className='number'>
                        <span onClick={()=>handlePrice('-')} className='control'>-</span>
                        <input placeholder='Item price' ref={price} type="number" min={'0'} max={'9999'} size={4} inputMode='numeric'/>
                        <span onClick={()=>handlePrice('+')} className='control'>+</span>
                    </div>
                    <p style={{'display':priceError}} className='error'>Please enter a valid Price</p>
                    <select ref={categoryId} className='input'>
                        <option key='blankKey' hidden value={item !== null ? item.categoryId : ''} >{item !== null ? item.category.title : 'Select a Company'}</option>
                        {
                            Array.from(categories).map((e,index) => {
                                return(
                                    <option key={index} value={e.id} >{e.title}</option>
                                    )
                        })
                        }
                    </select>
                    <p style={{'display':categoryIdError}} className='error'>Please choose a valid Category</p>
                    <select ref={companyId} className='input'>
                        <option key='blankKey' hidden value={item !== null ? item.companyId : ''} >{item !== null ? item.company.title : 'Select a Company'}</option>
                        {
                        Array.from(companies).map((e,index) => {
                            return(
                                <option key={index} value={e.id} >{e.title}</option>
                                )
                            })
                        }
                    </select>
                    <p style={{'display':companyIdError}} className='error'>Please choose a valid Company</p>
                    <div onClick={()=>{content.current.click()}} className={`upload-box ${state}`}>
                        <img ref={img} alt="" />
                        <input onChange={handleImg} ref={content} className='upload' type="file" accept="image/*" hidden />
                        <span>Drag & drop or Browse File to Upload</span>
                            <p style={{'display':contentError}} className='error'>Please enter a valid Img</p>
                    </div>
                    <button onClick={(e)=>handleCreate(e)} >{type == 'edit' ? 'Edit' : 'Create'} item</button>
                </form>
        </div>
        </>
    )
}