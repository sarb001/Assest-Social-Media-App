import { Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CreateNewPost, loaduser } from '../../Actions/User';
import { useNavigate } from 'react-router-dom';

const NewPost = () => {

    const [caption,setCaption] = useState('');
    const [image,setImage] = useState(null);
    const dispatch = useDispatch();
    const navigate =  useNavigate();

    const { loading, user , error } = useSelector((state) => state.user);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const Reader = new FileReader();
        Reader.onload = () => {
            if(Reader.readyState === 2){
                setImage(Reader.result);
            }
        }
        Reader.readAsDataURL(file);
        console.log('image clicked');
    }

    const submitHandler = async(e) => {
        console.log('clicked new post');
        e.preventDefault();
        await dispatch(CreateNewPost(caption,image));
        setImage('');
        setCaption('');
        navigate('/');
        dispatch(loaduser());
    }
    
    return (
    <div className='newPost'>
        <form className='newPostForm' onSubmit={submitHandler}>
             <Typography variant='h3'> New Post </Typography>
             <span style = {{width:'50%',height:'10vh'}}> 
             {image && <img src = {image}  alt = 'post' style = {{width:'20%'}} />}
             </span>
             <input type = "file"  accept='image/*' onChange = {handleImageChange} />
             <input type = "text"  placeholder='Caption...' 
              value = {caption}
              onChange={(e) => setCaption(e.target.value)}
             />
             <Button   disabled = {loading}  
             type = 'submit' variant='contained'> Post </Button>
        </form>
    </div>
  )
}

export default NewPost