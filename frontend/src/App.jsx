
import { BrowserRouter  as Router, Routes , Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Login from './Components/Login/Login.jsx';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loaduser } from './Actions/User.js';
import './App.css';
import Account from './Components/Account/Account';
import NewPost from './Components/NewPost/NewPost';
import Register from './Components/Register/Register';
import UpdateProfile from './Components/UpdateProfile/UpdateProfile';
import UserProfile from './Components/UserProfile/UserProfile';
import Search from './Components/Search/Search';
import Home from './Components/Home/Home';

import { ToastContainer  } from  'react-toastify' ;

import 'react-toastify/dist/ReactToastify.css';


function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(loaduser());
  },[])
  
  const { isAuthenticated } = useSelector((state) => state?.user);

  return (
     <div className='app'>
    <Router>
      {isAuthenticated && <Header /> }
        <Routes>
          <Route path = "/" element = {isAuthenticated ? <Home  /> : <Login />} />
          <Route path = "/login"  element = {!isAuthenticated ? <Login />  : ""} />
          <Route path = "/account"  element = {isAuthenticated ? <Account  /> : <Login />} />
          <Route path = "/register" element = {isAuthenticated ? <Account  /> : <Register />} />
          <Route path = "/newpost"  element = {isAuthenticated ? <NewPost  /> : <Login />} />
          <Route path = "/update/profile"  element = {isAuthenticated ? <UpdateProfile  /> : <Login />} />
          <Route path = "/user/:id"  element = {isAuthenticated ? <UserProfile  /> : <Login />} />
          <Route path = "search"  element = {isAuthenticated ? <Search  /> : <Login />} />
        </Routes>
    </Router>
    <ToastContainer />
     </div>
  )
}

export default App