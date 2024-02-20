import { Avatar, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetUpdatedProfile, loaduser } from '../../Actions/User';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {

     const {  loading , error , user  }  = useSelector((state) => state.user);

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [avatar, setAvatar] = useState();
    const [prevavatar, setprevavatar] = useState(user.avatar.url);

    const dispatch = useDispatch();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
            const Reader = new FileReader();
            Reader.readAsDataURL(file);

            Reader.onload = () => {
              if (Reader.readyState === 2) {
                  setAvatar(Reader.result);
              }
            };
    };

    const submitHandler = async(e) => {
        e.preventDefault();
        await dispatch(GetUpdatedProfile());
        alert(' Updated Profile ');
        setName('');
        setEmail('');
        dispatch(loaduser());
    }


  return (
    <div className="updateprofile">
   
      <form className="registerForm" onSubmit={submitHandler}>
        <Typography variant = "h5" style={{ padding: "2vmax" }}>
        Update Profile 
        </Typography>

        <Avatar
          src={prevavatar}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <input  type="text"   value={name}  placeholder="Name"
          className="registerInputs"  onChange={(e) => setName(e.target.value)}
          required
        />

        <input  type="email"   placeholder="Email" className="registerInputs"
          value={email}  onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Button disabled={loading} variant='contained' type="submit">
           Update 
        </Button>

      </form>
            
    </div>
  )
}

export default UpdateProfile