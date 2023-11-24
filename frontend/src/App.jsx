
import { BrowserRouter  as Router, Routes , Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loaduser } from './Actions/User';
import Home from './Components/Home/home';
import './App.css';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(loaduser());
  },[])
  
  // const { isAuthenticated } = useSelector((state) => state?.user);

  return (
     <div className='app'>
    <Router>
      {/* {isAuthenticated && <Header /> } */}
           <Header />  
        <Routes>
           <Route path = "/" element = {<Home />} />
          {/* <Route path = "/" element = {isAuthenticated ? <Home  /> : <Login />} /> */}
        </Routes>
    </Router>
     </div>
  )
}

export default App
