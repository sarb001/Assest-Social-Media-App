import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../Actions/User';
import { toast } from 'react-toastify';

const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate()

   const { loading ,error } = useSelector((state) => state.user);

   const handleform = async(e) => {
        e.preventDefault(); 
        dispatch(loginUser(email,password))
        navigate('/');
   }

   useEffect(() => {
     if(error){
      toast.error(error);
     }
   },[toast,error,dispatch])


  return ( 
   <div className="login" style={{margin:'4%'}}>       
     <form className='loginForm' onSubmit={handleform}>
      <h3> Social App </h3>

        <input  type = "email"     value = {email}
          placeholder='Enter Email' 
          onChange = {(e) => setEmail(e.target.value)}
        required />

        <input  type = "password"   value = {password}
          placeholder='Enter Password' 
          onChange = {(e) => setPassword(e.target.value)}
        required />

        <button type='submit'   disabled = {loading} > Login </button>
      <span>
         <Link to = "/register"> New User </Link>
      </span>
     </form>
   </div>
  )
}

export default Login