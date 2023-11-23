import React from 'react'
import { Link } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
  return (
    <div className='header'>
        <Link to = "/"> < HomeIcon />  </Link>
        <Link to = "/newpost"> <AddIcon /> </Link>
        <Link to = "/search"> <SearchIcon /> </Link>
        <Link to = "/acocunt"> <AccountCircleIcon /> </Link>
    </div>
  )
}

export default Header