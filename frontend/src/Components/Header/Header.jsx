import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const Header = () => {
    const [tab,setTab] = useState(window.location.pathname);

  return (
    <div className='header'>
        <Link to = "/" onClick={() => setTab('/')}> 
          {tab === '/'     ?   <HomeIcon style = {{color:'black'}} /> :  <HomeOutlinedIcon />}
         </Link>
        <Link to = "/newpost" onClick={() => setTab('/newpost')}>
          {tab === '/newpost' ?  <AddCircleOutlinedIcon style = {{color:'black'}}  /> :  <AddIcon />}
            
        </Link>
        <Link to = "/search" onClick={() => setTab('/search')}> 
          {tab === '/search' ?  <SearchIcon style = {{color:'black'}}  /> :  <SearchOutlinedIcon />}
        
        </Link>
        <Link to = "/account" onClick={() => setTab('/account')}> 
          {tab === '/account' ?  <AccountCircleIcon style = {{color:'black'}}  /> :  <AccountCircleOutlinedIcon />}
          
        </Link>
    </div>
  )
}

export default Header