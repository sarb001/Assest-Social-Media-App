import { Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetAllUsers } from '../../Actions/User';
import User from '../User/User';

const Search = () => {

    const { users , loading } = useSelector((state) => state.allusers);

    const [name,setName] = useState("");
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(GetAllUsers(name));
    }

  return (
        <div className="search">
            <form className='searchForm' onSubmit={submitHandler}>
                <Typography variant = 'h3' > Social App </Typography>
                <input  type = "text" 
                    placeholder='Enter Name'
                    value = {name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Button type = 'submit'  disabled = {loading} 
                 variant='contained'> Search </Button>
                <div className="searchResults">
                     {users && users.map((user) => (
                        <User  
                           key = {user._id}
                           userId={user._id}
                           name ={user.name}
                           avatar={user.avatar.url}
                        />
                     ))}
                </div>
            </form> 
        </div>  
  )
}

export default Search