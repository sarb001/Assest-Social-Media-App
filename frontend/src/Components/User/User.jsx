import React from 'react'
import { Link } from 'react-router-dom'
import './User.css' ;

const User = ({ userId,name,avatar }) => {
  return (
    <div className='homeUser'>
    <Link to = {`/user/${userId}`} >
        <img src = {avatar}  alt= "userimage"  style = {{width:'10%',borderRadius:'50px'}} />
        <span> {name} </span>
    </Link>
    </div>
  )
}

export default User