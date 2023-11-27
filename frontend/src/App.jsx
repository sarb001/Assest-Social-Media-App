
import { BrowserRouter  as Router, Routes , Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loaduser } from './Actions/User';
import Home from './Components/Home/home';
import './App.css';
import Account from './Components/Account/Account';
import NewPost from './Components/NewPost/NewPost';
import Register from './Components/Register/Register';

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
        </Routes>
    </Router>
     </div>
  )
}

export default App
